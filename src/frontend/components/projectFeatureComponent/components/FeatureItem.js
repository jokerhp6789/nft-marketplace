export const FeatureItem = ({
                              icon,
                              title,
                              desc,
                              featureUrl,
                              color
                            }) => {
  return (
    <div className="feature-item">
      <div className="feature-item__header">
        <div className="feature-item__header-container" style={{backgroundColor: color}}>{icon}</div>
      </div>
      <div className="feature-item__content">
        <a href={featureUrl} className="feature-item__content-title">{title}</a>
        <p className="feature-item__content-desc">{desc}</p>
      </div>
    </div>
  );
};