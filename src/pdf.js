import React, { Component } from 'react';
import PDFJS from 'pdfjs-dist';

import PropTypes from 'prop-types';
import Page from './Page';

class PDF extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pdf: null,
      scale: props.scale || 1.2,
    };
  }

  componentDidMount() {
    setTimeout(()=>{
      PDFJS.getDocument(this.props.src).then(pdf => {
        this.setState({ pdf });
      });
    }, 600)
  }

  render() {
    const { pdf, scale } = this.state;
    const numPages = pdf ? pdf.pdfInfo.numPages : 0;
    const fingerprint = pdf ? pdf.pdfInfo.fingerprint : 'none';
    return (
      <div className="pdf-context">
        {
          pdf ?
            <div className="pdf-viewer">
              {Array(...{ length: numPages }).map((v, i) => (
                <Page index={i + 1} key={`${fingerprint}-${i}`} pdf={pdf} scale={scale} />
              ))}
            </div>
            :
            <div className="loader" />
        }
      </div>
    );
  }
}

PDF.propTypes = {
  src: PropTypes.string.isRequired,
};

export default PDF;