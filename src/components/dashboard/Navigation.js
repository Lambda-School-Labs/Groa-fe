import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { loginAction } from "../../store/actions/loginAction";
import { recommendationAction } from "../../store/actions/recommendationActions";
import {
  faSearch,
  faUserCircle,
  faAngleDown,
  faBars,
  faSync
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ifDev } from "../../utils/removeAttribute.js";
import GroaLogo from "../../img/groa-logo-nav.png";
import { setFilter } from "../../store/actions/"; 

class Navigation extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.logout = this.logout.bind(this);
    this.getNewRecommendations = this.getNewRecommendations.bind(this);
  }

  handleChange = e => {
    this.props.setFilter(e.target.value);
  };

  logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("state");
  };

  getNewRecommendations = id => {
    // Gets new recommendations for account, if applicible
    this.props.recommendationAction(id);
  };

  render() {
    return (
      <div className="mainContainer" data-test={ifDev("navigation")}>
        <div className="navContainer">
          <div className="Bars hidden">
            <FontAwesomeIcon className="bars-icon" icon={faBars} />
            <i className="far fa-bars"></i>
          </div>

          <div className="Links">
            <img src={GroaLogo} alt="Groa Logo" />

            <NavLink
              className="NavLink recommended"
              to={`/${this.props.userid}/recommended`}
            >
              Recommended
            </NavLink>
          

            <NavLink className="NavLink  watchlist" to={`/${this.props.userid}/watchlist`}>
              Watchlist
            </NavLink>

            <NavLink
              className="NavLink  hidden"
              to={`/${this.props.userid}/explore`}
            >
              Explore
            </NavLink>
          </div>

          {/* If the path is upload hide the search container */}
          <form className={`searchContainer ${window.location.pathname === `/${this.props.userid}/upload` ? `hidden` : null }`}>
            <FontAwesomeIcon className="search-icon" icon={faSearch} />
            <input
              className="searchBox"
              type="text"
              name="search"
              value={this.props.searchTerm}
              onChange={this.handleChange}
              placeholder="Search..."
            />
          </form>

          {/* If the path is recommended show update recommendations button */}
          <button
            className={`recommendations-button ${window.location.pathname === `/${this.props.userid}/recommended` ? null : ` hidden` }`}
            onClick={() => this.getNewRecommendations(this.props.userid)}
          > 
            <FontAwesomeIcon className="sync-icon" icon={faSync} />
            <i className="fas fa-sync"></i> 
            Update your recs
          </button>
       

          <div className="fa-icons">
            {/* This is the container for the user-icon and the arrow */}
            <div className="dropdown-hover">
              <FontAwesomeIcon
                className="user-circle-icon"
                icon={faUserCircle}
              />
              <i className="far fa-user-circle"></i>

              <FontAwesomeIcon className="angle-down-icon" icon={faAngleDown} />
              <i className="fas fa-angle-down"></i>

              <div className="dropdown-content">
              {/* This is the dropdown menu, links display based on media query */}
                <NavLink
                  className="NavLink recommended-menu"
                  to={`/${this.props.userid}/recommended`}
                >
                  Recommended
                </NavLink>

                <NavLink 
                  className="NavLink ratings-menu" 
                  to={`/${this.props.userid}/ratings`}
                >
                  Ratings
                </NavLink>

                <NavLink 
                  className="NavLink upload-menu" 
                  to={`/${this.props.userid}/upload`}
                >
                  Upload data
                </NavLink>

                <NavLink 
                  className="NavLink watchlist-menu" 
                  to={`/${this.props.userid}/watchlist`}
                >
                  Watchlist
                </NavLink>

                <NavLink
                  className="NavLink logout-menu"
                  onClick={this.logout}
                  data-test={ifDev("logoutBtn")}
                  to="/login"
                >
                  Log out
               </NavLink>              
               </div>
               {/* END dropdown-content */}
             </div>
            {/* END dropdown-hover */}
          </div>
          {/* END fa-icons */}
        </div>
        {/* END navContainer */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userid: state.login.userid,
    searchTerm: state.filter.searchTerm
  };
};
export default connect(mapStateToProps, { loginAction, recommendationAction, setFilter })(
  Navigation
);