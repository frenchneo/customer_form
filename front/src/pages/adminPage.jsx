import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../ctx/authContext";
import DataTable from "react-data-table-component";
import Modal from "react-modal";
import { errorAlert, successAlert } from "../helpers/notifications";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const AdminPage = () => {
  let subtitle;
  const authContext = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [detIsOpen, setdet] = useState(false);
  const [currentInternaute, setCurrentInternaute] = useState(null);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    //subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }
  const handleAction = (row) => {
    setCurrentInternaute(row);
    openModal();
  };
  const handleDetail = (row) => {
    setCurrentInternaute(row);
    setdet(true);
  };

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Nom",
      selector: (row) => row.nom + " " + row.prenom.charAt(0) + ".",
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex items-center">
          <button
            onClick={() => handleAction(row.id)}
            className="text-red-500 hover:text-red-700 px-2 py-1"
          >
            Supprimer
          </button>
          <button
            onClick={() => handleDetail(row)}
            className="text-blue-500 hover:text-blue-700 px-2 py-1 ml-2"
          >
            Détails
          </button>
        </div>
      ),
    },
  ];

  const handleDelete = (id) => {
    fetch(`http://localhost:3000/api/v1/internautes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authContext.token}`,
      },
    }).then((res) => {
      if (res.status !== 200) {
        errorAlert("Une erreur est survenue");
      } else {
        successAlert("Internaute supprimé avec succès");
        closeModal();
      }
    });
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    const filtered = data.filter((row) => {
      return (
        row.nom.toLowerCase().includes(value.toLowerCase()) ||
        row.email.toLowerCase().includes(value.toLowerCase()) ||
        row.prenom.toLowerCase().includes(value.toLowerCase())
      );
    });

    setFilteredData(filtered);
  };

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/internautes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authContext.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data.data);
        setFilteredData(data.data);
      });
  }, [openModal]);

  const handleLogout = () => {
    // Vous pouvez mettre ici la logique pour déconnecter l'utilisateur
    authContext.logout();
  };

  return (
    <div className="p-4">
      <header className="text-2xl font-semibold mb-4">
        Admin Page
        <button
          onClick={handleLogout}
          className="float-right text-red-500 hover:text-red-700"
        >
          Déconnexion
        </button>
      </header>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2
          ref={(_subtitle) => (subtitle = _subtitle)}
          className="text-lg font-semibold mb-2"
        >
          Êtes-vous sûr ?
        </h2>
        <button
          onClick={() => handleDelete(currentInternaute.id)}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded mr-2"
        >
          Oui
        </button>
        <button
          onClick={closeModal}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-3 rounded"
        >
          Non
        </button>
      </Modal>
      <Modal
        isOpen={detIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={() => setdet(false)}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 className="text-lg font-semibold mb-2">
          Détails de l'internaute {currentInternaute?.id}
        </h2>

        <div
          className="bg-white p-4 shadow-md rounded-md w-80"
          style={{ height: "300px" }}
        >
          <div className="grid grid-cols-2 gap-4">
            <h2 className="text-xl font-semibold mb-4">
              {currentInternaute?.nom ? currentInternaute.nom : ""}
              {currentInternaute?.prenom ? " " + currentInternaute.prenom : ""}
            </h2>
            {currentInternaute?.photo ? (
              <img
                src={currentInternaute.photo}
                alt="Photo de l'internaute"
                className="w-20 h-20 rounded-full"
              />
            ) : null}
          </div>
          {currentInternaute?.email ? (
            <p>
              <span className="font-semibold">Email:</span>{" "}
              {currentInternaute?.email ? currentInternaute.email : ""}
            </p>
          ) : null}
          {currentInternaute?.tel ? (
            <p>
              <span className="font-semibold">Téléphone:</span>{" "}
              {currentInternaute?.tel ? currentInternaute.tel : ""}
            </p>
          ) : null}
          {currentInternaute?.adress ? (
            <p>
              <span className="font-semibold">Adresse:</span>{" "}
              {currentInternaute?.adress ? currentInternaute.adress : ""}
            </p>
          ) : null}
          {currentInternaute?.dob ? (
            <p>
              <span className="font-semibold">Date de naissance:</span>{" "}
              {currentInternaute?.dob ? currentInternaute.dob : ""}
            </p>
          ) : null}
          <button
            onClick={() => setdet(false)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-md mt-4"
          >
            Fermer
          </button>
        </div>
      </Modal>
      <input
        type="text"
        placeholder="Rechercher..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="w-full px-3 py-2 border rounded-md mb-4"
      />
      <DataTable
        columns={columns}
        data={filteredData}
        pagination={true}
        className="shadow-md rounded-md"
      />
    </div>
  );
};

export default AdminPage;
