import React from 'react'
import {Helmet} from "react-helmet-async";

export const Meta = ({title,description,keywords}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
    </Helmet>
  )

}

Meta.defaultProps = {
  title: 'Proshop',
  description: 'E-commerce website built with React, Redux, and Tailwind CSS',
  keywords: ['e-commerce', 'react', 'redux', 'tailwind', 'css'],
};