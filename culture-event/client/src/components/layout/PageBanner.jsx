import React from 'react';
import './PageBanner.css';

function PageBanner({
  title = 'Заголовок страницы',
  subtitle = 'Краткое описание страницы',
  backgroundImage = '',
  align = 'left',
}) {
  const bannerStyle = backgroundImage
    ? { backgroundImage: `linear-gradient(rgba(17,17,17,0.55), rgba(17,17,17,0.55)), url(${backgroundImage})` }
    : {};

  return (
    <section
      className={`page-banner page-banner--${align} ${backgroundImage ? 'page-banner--with-image' : ''}`}
      style={bannerStyle}
    >
      <div className="page-banner__content">
        <p className="page-banner__label">Culture Event</p>
        <h1 className="page-banner__title">{title}</h1>
        <p className="page-banner__subtitle">{subtitle}</p>
      </div>
    </section>
  );
}

export default PageBanner;