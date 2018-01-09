import React, { Component } from "react";
import PropTypes from "prop-types";
import PDF from "./pdf";

class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "N/A",
      page: null,
      width: 0,
      height: 0
    };
  }
  componentDidMount() {
    this._update(this.props.pdf);
  }
  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.props.pdf != nextProps.pdf || this.state.status !== nextState.status
    );
  }
  componentDidUpdate(prevProps, prevState) {
    this._update(this.props.pdf);
  }
  _update(pdf) {
    if (pdf) {
      this._loadPage(pdf);
    } else {
      this.setState({ status: "loading" });
    }
  }
  _loadPage(pdf) {
    if (this.state.status === "rendering" || this.state.page != null) return;
    pdf.getPage(this.props.index).then(this._renderPage.bind(this));
    this.setState({ status: "rendering" });
  }
  _renderPage(page) {
    const { scale } = this.props;
    const viewport = page.getViewport(scale);
    const { width, height } = viewport;
    const canvas = this.canvas;
    const context = canvas.getContext("2d");
    canvas.width = width;
    canvas.height = height;

    page.render({
      canvasContext: context,
      viewport
    });

    this.setState({ status: "rendered", page, width, height });
  }
  render() {
    const { width, height, status } = this.state;
    return (
      <div
        className={`pdf-page {status}`}
        style={{ width, height, maxWidth: "100%" }}
      >
        <canvas
          ref={c => {
            this.canvas = c;
          }}
        />
      </div>
    );
  }
}

Page.propTypes = {
  index: PropTypes.number.isRequired
};

export default Page;
