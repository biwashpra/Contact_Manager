import React, { useEffect, useState } from "react";

//get localstorage
const getContact = () => {
  const lists = localStorage.getItem("allcontacts");

  if (lists) {
    return JSON.parse(lists);
  } else {
    return [];
  }
};

const Contact = () => {
  const [name, setname] = useState("");
  const [phone, setphone] = useState();

  const [contactList, setcontactList] = useState(getContact());

  //Add a contact
  const addContact = () => {
    const contact = {
      id:
        contactList.length === 0
          ? 1
          : contactList[contactList.length - 1].id + 1,
      name: name,
      phone: phone,
    };
    setcontactList([...contactList, contact]);
  };

  //Delete a contact
  const deleteContact = (id) => {
    const updatedItem = contactList.filter((item) => {
      return item.id !== id;
    });
    setcontactList(updatedItem);
  };

  //Edit a contact
  const editContact = (id) => {
    const editedItem = contactList.find((item) => {
      return item.id === id;
    });
    let nameitem = editedItem.name;
    let phoneitem = editedItem.phone;

    console.log(editedItem);
    setname(nameitem);
    setphone(phoneitem);
  };

  //adding localstorage
  useEffect(() => {
    localStorage.setItem("allcontacts", JSON.stringify(contactList));
  }, [contactList]);
  return (
    <>
      <div className="Header">
        <h1 className="text-white bg-cyan-600 text-center text-4xl font-semibold py-3">
          Contact Manager
        </h1>
        <div className=" flex justify-center">
          <i className="fa-regular fa-address-card text-2xl my-2 mx-2 text-cyan-900"></i>
          <h2 className="text-cyan-900 text-center font-semibold text-2xl my-2 mx-2">
            Contact Lists
          </h2>
        </div>
      </div>

      <div className="contact-input-form-and-list">
        <div className="container px-5 py-5 mx-auto">
          <div className="flex flex-col text-center w-full mb-5">
            <h1 className="sm:text-3xl text-2xl font-medium mb-2 text-gray-900">
              New Contacts
            </h1>
          </div>

          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <div className="flex flex-wrap justify-center -m-2">
              <div className="p-2 w-1/2">
                <div className="relative">
                  <h5 className="leading-7 text-xl text-black font-semibold">
                    Name
                  </h5>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={name}
                    onChange={(event) => setname(event.target.value)}
                    placeholder="Your Name Please"
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-cyan-500 focus:bg-white focus:ring-2 focus:ring-cyan-300 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out placeholder:italic placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div className="p-2 w-1/2">
                <div className="relative">
                  <h5 className="leading-7 text-xl text-black font-semibold">
                    Phone
                  </h5>
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    value={phone}
                    onChange={(event) => setphone(event.target.value)}
                    placeholder="+977-980-0001111"
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-cyan-500 focus:bg-white focus:ring-2 focus:ring-cyan-300 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out placeholder:italic placeholder:text-slate-400"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="p-2 w-full">
            <button
              onClick={addContact}
              className="flex mx-auto rounded-full text-white font-semibold bg-cyan-600 border-0 py-2 px-6 mt-5 focus:outline-none hover:bg-indigo-600 text-xl"
            >
              Add
              <i className="fa-solid fa-user-plus text-xl ml-2 text-white"></i>
            </button>
          </div>
        </div>
      </div>

      <div className="display-data">
        {contactList.map((item) => {
          return (
            <div>
              <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg bg-white border border-gray-200 rounded-lg shadow-md dark:bg-cyan-600 dark:border-gray-700">
                  <div className="flex flex-col items-center pb-5">
                    <span className="my-2 text-2xl font-semibold text-gray-900 dark:text-white">
                      <i className="fa-solid fa-user-tie text-2xl my-2 mx-2 text-black"></i>
                      {item.name}
                    </span>
                    <span className="text-lg text-gray-500 dark:text-white">
                      <i className="fa-solid fa-phone text-2xl my-2 mx-2 text-black"></i>
                      {item.phone}
                    </span>
                    <div className="flex mt-4 space-x-3 md:mt-6">
                      <button
                        onClick={() => editContact(item.id)}
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:hover:border-white"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteContact(item.id)}
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-red-900 bg-white border border-red-500 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-red-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-white dark:focus:ring-gray-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Contact;
