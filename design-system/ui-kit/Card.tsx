import React from 'react';

type CardProps = {
  title?: string;
  children: React.ReactNode;
};

export const Card: React.FC<CardProps> = ({ title, children }) => {
  return (
    <section className="ds-card" style={{ padding: 16 }}>
      {title && (
        <h3 style={{ margin: 0, marginBottom: 8, fontSize: 'var(--ds-font-md)', fontWeight: 600 }}>
          {title}
        </h3>
      )}
      <div>{children}</div>
    </section>
  );
};

export default Card;
