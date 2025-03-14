import React, { Component } from "react";
import { Link, useParams } from "react-router-dom";
import PropTypes from "prop-types";

import X2JS from "x2js";

// Create a wrapper component that uses hooks and passes params as props
function TxtPageWrapper(props) {
  const params = useParams();
  return <Txt_page params={params} {...props} />;
}

// Main component renamed to be the implementation
class Txt_page extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  //	------------------------	------------------------	------------------------

  render() {
    // Use params from props instead of this.props.params (which comes from wrapper)
    const page = this.props.params.page || "home";
    const page_x = app.settings.ws_conf.pgs[page];

    // console.log('Txt_page', page)

    if (!page || !page_x) return null;

    return (
      <section id="Txt_page">
        <div id="page-container">
          <h1>{page_x.pg_name}</h1>

          <div dangerouslySetInnerHTML={{ __html: page_x.txt.__cdata }} />

          <div className="btns">
            {new X2JS().asArray(page_x.btns.b).map(function (b, i) {
              console.log(b);
              return (
                <Link to={b.u} key={i}>
                  <button type="submit" className="button">
                    <span>
                      {b.txt} <span className="fa fa-caret-right"></span>
                    </span>
                  </button>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    );
  }
}

Txt_page.propTypes = {
  params: PropTypes.any,
};

// Remove contextTypes - it's not used in React Router v6
// Txt_page.contextTypes = {
//   router: PropTypes.object.isRequired,
// };

// Export the wrapper as the default
export default TxtPageWrapper;
