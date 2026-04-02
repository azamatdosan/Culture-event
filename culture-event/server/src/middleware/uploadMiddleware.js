import multer from 'multer';
import path from 'path';

// Настройка хранилища
const storage = multer.diskStorage({
  destination(req, file, cb) {
    // Указываем папку для сохранения (ее нужно будет создать в корне server/uploads/avatars)
    cb(null, 'uploads/avatars/');
  },
  filename(req, file, cb) {
    // Генерируем уникальное имя файла: имя_поля + текущее_время + расширение
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

// Фильтр: разрешаем загружать только картинки
const checkFileType = (file, cb) => {
  const filetypes = /jpg|jpeg|png|webp/;
  // Проверяем расширение
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Проверяем MIME-тип
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Разрешены только изображения (JPG, JPEG, PNG, WEBP)!'));
  }
};

// Экспортируем готовый middleware
export const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
  limits: {
    fileSize: 2 * 1024 * 1024, // Ограничение размера файла: 2 МБ
  },
});