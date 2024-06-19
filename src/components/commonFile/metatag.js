import React from "react";
import { Helmet } from "react-helmet-async";
const metatag = (props) => {
  const { children } = props;
  return (
    <Helmet>
      <title>{props.title}</title>
      <meta name="og:title" content={props.ogtitle} />
      <meta name="og:description" content={props.description} />
      <meta
        property="og:image"
        content={props.image || "https://ibb.co/YtBfLMN"}
      />
      <meta property="og:image:width" content="140" />
      <meta property="og:image:height" content="140" />
      <meta name="theme-color" content="#008f68" />
      {children}
    </Helmet>
  );
};
export default metatag;
