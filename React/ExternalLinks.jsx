import React, { useState, useEffect } from "react";
import debug from "sabio-debug";
import { Card } from "react-bootstrap";
import Section from "components/common/Section";
import { Formik, Form, Field, ErrorMessage } from "formik";
import externalLinkSchema from "../../../src/schemas/externalLinkSchema";
import externalLinkService from "services/externalLinkService";
import lookUpService from "services/lookUpService";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import ELinkCard from "./ELinkCard";
import "./ELinks.css";
import ELinksOptions from "./ELinksOptions";

const _logger = debug.extend("MainExLinkLogger");
function ExternalLinks() {
  const [exLinkFormData, setExLinkFormData] = useState({
    urlTypeId: "",
    urlType: {
      id: 0,
      name: "",
    },
    entityType: {
      id: 0,
      name: "",
    },
    url: "https://www.website.com",
    entityId: "123",
    entityTypeId: "2",
  });

  const [lookUpReturns, setLookupReturns] = useState({
    entityTypes: [],
    urlTypes: [],
  });

  const [exLinks, setExLinks] = useState({
    arrayOfLinks: [],
    mappedLinks: [],
  });

  const [selected, setSelected] = useState({
    editMode: false,
    linkSelected: 0,
  });

  const linkFormClear = () => {
    setSelected((prevState) => {
      const selectedStatus = { ...prevState };
      selectedStatus.editMode = false;
      selectedStatus.linkSelected = 0;
      return selectedStatus;
    });

    setExLinkFormData({
      urlTypeId: "",
      urlType: {
        id: 0,
        name: "",
      },
      entityType: {
        id: 0,
        name: "",
      },
      url: "https://www.website.com",
      entityId: "123",
      entityTypeId: "2",
    });
  };

  useEffect(() => {
    lookUpService
      .LookUp(["UrlTypes", "EntityTypes"])
      .then(onGetLookUpSuccess)
      .catch(onGetLookUpError);
    externalLinkService.Get().then(onGetLinksSuccess).catch(onGetLinksError);
  }, []);

  const onGetLookUpSuccess = (response) => {
    setLookupReturns((prevState) => {
      const lookups = { ...prevState };
      lookups.entityTypes = response.item.entityTypes;
      lookups.urlTypes = response.item.urlTypes;
      _logger(lookups);
      return lookups;
    });
    _logger(lookUpReturns);
  };

  const onGetLookUpError = (error) => {
    _logger(error);
  };

  const mapUrlType = (urlType) => {
    return (
      <ELinksOptions urlType={urlType} key={******PROPRIETARY CODE******} />
    );
  };

  const onGetLinksSuccess = (data) => {
    let links = data.items;
    setExLinks((prevState) => {
      const el = { ...prevState };
      el.arrayOfLinks = links;
      el.mappedLinks = links.map(mapALink);
      return el;
    });
  };

  const onGetLinksError = (error) => {
    Toastify({
      text: "It doesn't look like you've posted any external links. Try posting one using the form below.",
      className: "Error",
      style: {
        background: "linear-gradient(to right, #B00000, #B00000)",
      },
    }).showToast();
    _logger("An error has occured:", error);
  };

  const mapALink = (aLink) => {
    return (
      <ELinkCard
        link={aLink}
        key={******PROPRIETARY CODE******}
        handleEdit={onLinkSelected}
        handleDelete={onLinkDeleteRequested}
      />
    );
  };

  const onLinkSelected = (thisLink) => {
    _logger("Edit this: ", thisLink);
    const id = thisLink.id;
    setSelected((prevState) => {
      const ls = { ...prevState };
      ls.linkSelected = id;
      ls.editMode = true;
      return ls;
    });

    setExLinkFormData((prevState) => {
      const newState = { ...prevState };
      newState.url = thisLink.url;
      newState.urlTypeId = thisLink?.urlType?.id || thisLink.urlTypeId;
      return newState;
    });
  };

  const onUpdateSuccess = (response) => {
    Toastify({
      text: "Link successfully updated!",
      className: "Success",
      style: {
        background: "linear-gradient(to right, #00900a, #00900a)",
      },
    }).showToast();
    const updateId = selected.linkSelected;
    externalLinkService
      .GetByExLinkId(updateId)
      .then(onDeleteSuccess(updateId, "update"))
      .then(addCreatedToDOMSuccess)
      .catch(addCreatedToDOMError);
    _logger(response);
  };

  const onUpdateError = (error) => {
    Toastify({
      text: "Something went wrong. Please refresh this page.",
      className: "Error",
      style: {
        background: "linear-gradient(to right, #B00000, #B00000)",
      },
    }).showToast();
    _logger(error);
  };

  const onLinkDeleteRequested = (id) => {
    const deleteFromDOM = onDeleteSuccess(id);
    externalLinkService.Delete(id).then(deleteFromDOM).catch(onDeleteError);
  };

  const onDeleteSuccess = (id, message) => {
    if (message !== "update") {
      Toastify({
        text: "Link successfully deleted!",
        className: "Success",
        style: {
          background: "linear-gradient(to right, #00900a, #00900a)",
        },
      }).showToast();
    }
    setExLinks((prevState) => {
      const linksOnPage = { ...prevState };
      linksOnPage.arrayOfLinks = [...linksOnPage.arrayOfLinks];
      linksOnPage.mappedLinks = [...linksOnPage.mappedLinks];
      const idxOf = linksOnPage.arrayOfLinks.findIndex((link) => {
        let result = false;
        if (link.id === id) {
          result = true;
        }
        return result;
      });
      if (idxOf >= 0) {
        _logger(linksOnPage);
        linksOnPage.arrayOfLinks.splice(idxOf, 1);
        linksOnPage.mappedLinks = linksOnPage.arrayOfLinks.map(mapALink);
      }
      return linksOnPage;
    });
    setSelected((prevState) => {
      const selectedStatus = { ...prevState };
      selectedStatus.editMode = false;
      selectedStatus.linkSelected = 0;
      return selectedStatus;
    });
  };

  const onDeleteError = (error) => {
    Toastify({
      text: `Something unexpected occurred: ${error}`,
      className: "Error",
      style: {
        background: "linear-gradient(to right, #B00000, #B00000)",
      },
    }).showToast();
    _logger(response);
  };

  const onFormSubmit = (values, formik) => {
    const payload = {
      url: values.url,
      urlTypeId: parseInt(values.urlTypeId),
      entityId: parseInt(values.entityId),
      entityTypeId: parseInt(values.entityTypeId),
    };
    const id = selected.linkSelected;
    if (selected.editMode === false && id === 0) {
      externalLinkService
        .Add(payload)
        .then(onFormSubmitSuccess)
        .catch(onFormSubmitError);
    } else if (selected.editMode === true && id >= 1) {
      payload.id = id;
      externalLinkService
        .Update(id, payload)
        .then(onUpdateSuccess)
        .catch(onUpdateError);
    } else {
      return _logger("an error has occurred.");
    }
    formik.resetForm();
  };

  const onFormSubmitSuccess = (response) => {
    Toastify({
      text: "External link successfully added!",
      className: "Success",
      style: {
        background: "linear-gradient(to right, #00900a, #00900a)",
      },
    }).showToast();
    const id = response.item;
    setSelected((prevState) => {
      const em = { ...prevState };
      em.editMode === true;
      em.linkSelected === id;
      return em;
    });
    externalLinkService
      .GetByExLinkId(id)
      .then(addCreatedToDOMSuccess)
      .catch(addCreatedToDOMError);
  };

  const addCreatedToDOMSuccess = (response) => {
    let link = response.item;
    setExLinks((prevState) => {
      const el = { ...prevState };
      el.arrayOfLinks = [...el.arrayOfLinks];
      el.arrayOfLinks.unshift(link);
      el.mappedLinks = el.arrayOfLinks.map(mapALink);
      return el;
    });
  };

  const addCreatedToDOMError = (error) => {
    Toastify({
      text: "Something went wrong. Please refresh the page and try again.",
      className: "Error",
      style: {
        background: "linear-gradient(to right, #B00000, #B00000)",
      },
    }).showToast();
    _logger("An error has occured:", error);
  };

  const onFormSubmitError = (error) => {
    Toastify({
      text: "Something went wrong. Please refresh the page and try again.",
      className: "Error",
      style: {
        background: "linear-gradient(to right, #B00000, #B00000)",
      },
    }).showToast();
    _logger("An error has occured:", error);
  };

  return (
    <React.Fragment>
      <div className="text-center">
        <h1>External Links</h1>
      </div>
      <Section id="exLinkForm1">
        <div className="links-form ml-1 float-end">
          <div className="card h-100 bg-dark ">
            <div className="card-header bg-dark">
              <h5 className="mb-0 text-white">Add An External Link</h5>
            </div>

            <Formik
              enableReinitialize={true}
              initialValues={exLinkFormData}
              validationSchema={externalLinkSchema}
              onSubmit={onFormSubmit}
            >
              <Form>
                <div className="card-body text-white bg-dark pb-0">
                  <div className="mb-3">
                    <label className="form-label" htmlFor="urlTypeId">
                      Url Type
                    </label>
                    <ErrorMessage
                      name="urlTypeId"
                      component="div"
                      className="has-danger"
                    />
                    <Field
                      as="select"
                      className="form-select"
                      name="urlTypeId"
                      id="urlTypeId"
                    >
                      <option value="">Select an url type</option>
                      {lookUpReturns.urlTypes.map(mapUrlType)}
                    </Field>
                    <label className="form-label" htmlFor="url">
                      Url
                    </label>
                    <ErrorMessage
                      name="url"
                      component="div"
                      className="danger"
                    />
                    <Field
                      type="text"
                      className="form-control"
                      name="url"
                      id="url"
                    ></Field>
                  </div>
                  <div className="d-flex w-100">
                    {!selected.editMode && (
                      <button
                        className="m-3 mx-3 p-3 btn btn-primary btn-sm btn-exlink"
                        type="submit"
                        name="button"
                      >
                        Post Link
                      </button>
                    )}
                    {selected.editMode && (
                      <button
                        className="m-3 mx-3 p-3 btn btn-success btn-sm btn-exlink"
                        type="submit"
                        name="button"
                      >
                        Update
                      </button>
                    )}

                    <button
                      type="reset"
                      className="m-3 mx-3 p-3 btn btn-warning btn-sm btn-exlinks"
                      onClick={linkFormClear}
                    >
                      Clear Form
                    </button>
                  </div>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
        <Card className="links-display">
          <div className="card h-100 bg-dark">
            <div className="card-header ">
              <h5 className="mb-0 text-white">My External Links</h5>
            </div>
            <div className="row">{exLinks.mappedLinks}</div>
          </div>
        </Card>
      </Section>
    </React.Fragment>
  );
}
export default ExternalLinks;
