import React from "react";
import PropTypes from "prop-types";
import "./ELinks.css";
import facebookLogo from "../../assets/img/logos/facebook.png";
import instagramLogo from "../../assets/img/logos/instagram.jpg";
import linkedInLogo from "../../assets/img/logos/linkedin.png";
import twitterLogo from "../../assets/img/logos/twitter.png";
import siteLogo from "../../assets/img/logos/site.png";
import debug from "sabio-debug";
import Swal from "sweetalert2";

const _logger = debug.extend("ELinkCard");

function ELinkCard(props) {
  _logger(props);
  const thisLink = props.link;

  const onEditLinkClicked = () => {
    props.handleEdit(thisLink);
  };

  const onDeleteLinkClicked = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        props.handleDelete(thisLink.id);
      } else if (!result.isConfirmed) {
        return false;
      }
    });
  };
  //#region setting the correct logo based on the urlType's name
  let image = null;
  if (props?.link?.urlType?.name === "Facebook" || props.link.urlTypeId === 1) {
    image = facebookLogo;
  } else if (
    props?.link?.urlType?.name === "Instagram" ||
    props.link.urlTypeId === 2
  ) {
    image = instagramLogo;
  } else if (
    props?.link?.urlType?.name === "LinkedIn" ||
    props.link.urlTypeId === 3
  ) {
    image = linkedInLogo;
  } else if (
    props?.link?.urlType?.name === "Twitter" ||
    props.link.urlTypeId === 4
  ) {
    image = twitterLogo;
  } else {
    image = siteLogo;
  }
  //#endregion
  return (
    <div className="col-12">
      <div className="row p-3 m-1 text-left">
        <div className="w-25 text-white text-wrap text-center">
          <img className="links-logo img-rounded" src={image} alt="Url Logo" />
        </div>
        <div className="w-50 text-white text-wrap">
          <br />
          <a rel="noreferrer" target="_blank" href={thisLink.url}>
            {props.link.url}
          </a>
        </div>
        <div>
          <button
            type="button"
            className="btn btn-exlinks btn-danger text-white float-end btn-sm"
            onClick={onDeleteLinkClicked}
          >
            Delete Link
          </button>
          <button
            type="button"
            className="btn btn-exlinks mx-3 btn-success text-white float-end btn-sm"
            onClick={onEditLinkClicked}
          >
            Edit Link
          </button>
        </div>
      </div>
    </div>
  );
}
ELinkCard.propTypes = {
  link: PropTypes.shape({
    id: PropTypes.number.isRequired,
    urlType: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
    entityType: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
    urlTypeId: PropTypes.number,
    url: PropTypes.string.isRequired,
  }),
  handleEdit: PropTypes.func,
  handleDelete: PropTypes.func,
};

export default React.memo(ELinkCard);
