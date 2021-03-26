import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import LinkForm from "./LinkForm";
import { db } from "../firebase";

const Links = () => {
  const [links, setLinks] = useState([]);
  const [currentId, setCurrentId] = useState("");

  const addTask = async (linkObject) => {
    try {
      if (currentId === "") {
        await db.collection("links").doc().set(linkObject);
        toast("New Link Added", { type: "success", autoClose: 2000 });
      } else {
        await db.collection("links").doc(currentId).update(linkObject)
        toast("Link Updated Successfully", { type: "info", autoClose: 2000 });
        setCurrentId("")
      }
    } catch (error) {
      console.error(error)
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("are you sure you want to delete this link?")) {
      await db.collection("links").doc(id).delete();
      toast("Link Removed Successfully", { type: "error", autoClose: 2000 });
    }
  };

  const getLinks = async () => {
    db.collection("links").onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setLinks(docs);
    });
  };

  useEffect(() => {
    getLinks();
  }, []);

  return (
    <>
      <div className="col-md-4 pd-2">
        <LinkForm links={links} currentId={currentId} addTask={addTask} />
      </div>

      <div className="col-md-8 pd-2">
        {links.map((link) => {
          return (
            <div key={link.id} className="card mb-1">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <h4>{link.name}</h4>
                  <div>
                    <i
                      className="material-icons text-danger"
                      onClick={() => handleDelete(link.id)}
                    >
                      close
                    </i>
                    <i
                      className="material-icons"
                      onClick={() => setCurrentId(link.id)}
                    >
                      create
                    </i>
                  </div>
                </div>

                <p>{link.description}</p>
                <a href={link.url} target="_blank" rel="noreferrer">
                  Go to Website
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Links;
