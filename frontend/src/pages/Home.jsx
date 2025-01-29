import { useEffect, useState } from 'react';
import SideBar from '../components/SideBar';
import Notes from '../components/Notes';
import Navbar from '../components/Navbar';
import { delet, get, post, put } from '../services/ApiEndPoint';
import Modal from '../components/Modal';
import toast from 'react-hot-toast';
import EidtModal from '../components/EidtModal';
import DeleteModal from '../components/DeleteModal';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [updatetitle, setUpdatetitle] = useState('');
  const [modalId, setModalId] = useState('');
  const [refersh, setRefersh] = useState(false);
  const [closeModal, setCloseModal] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
  }, [user, navigate]);

  const handleNoteSubmit = async () => {
    if (!user || !user.token) {
      toast.error('Unauthorized');
      navigate('/login');
      return;
    }

    try {
      const request = await post('/notes/createNotes', { title }, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const response = request.data;
      if (response.success) {
        toast.success(response.message);
        setRefersh(!refersh);
        setCloseModal(true);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      }
      console.log(error);
    }
  };

  const handeleUpdate = async () => {
    if (!user || !user.token) {
      toast.error('Unauthorized');
      navigate('/login');
      return;
    }

    try {
      const request = await put(`/notes/updateNotes/${modalId}`, { title: updatetitle }, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const response = request.data;
      if (response.success) {
        toast.success(response.message);
        setRefersh(!refersh);
        setCloseModal(true);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      }
      console.log(error);
    }
  };

  const handelNotesDelete = async () => {
    if (!user || !user.token) {
      toast.error('Unauthorized');
      navigate('/login');
      return;
    }

    try {
      const request = await delet(`/notes/deleteNotes/${modalId}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const response = request.data;
      if (response.success) {
        toast.success(response.message);
        setRefersh(!refersh);
        setCloseModal(true);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      }
      console.log(error);
    }
  };

  useEffect(() => {
    const GetNotes = async () => {
      if (!user || !user.token) {
        toast.error('Unauthorized');
        navigate('/login');
        return;
      }

      try {
        const request = await get('/notes/getNotes', {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const response = request.data;
        setNotes(response.Notes);
      } catch (error) {
        console.log(error);
      }
    };
    if (user) {
      GetNotes();
    }
  }, [refersh, user, navigate]);

  return (
    <>
    <Modal
      Modaltitle={"Write Notes"}
      value={title}
      handleChange={(e) => setTitle(e.target.value)}
      handleNoteSubmit={handleNoteSubmit}
      HandleClose={() => setCloseModal(false)} // Ensure HandleClose is a function
    />
    <EidtModal
      Modaltitle={'Updated Notes'}
      handleChange={(e) => setUpdatetitle(e.target.value)}
      handleNoteSubmit={handeleUpdate}
      value={updatetitle}
    />
    <DeleteModal handelNotesDelete={handelNotesDelete} />
    <div className='row'>
      <div className='col-lg-2 col-md-2 shadow d-flex min-vh-100'>
        <SideBar />
      </div>
      <div className='col-lg-10 col-md-10'>
        <Navbar />
        {notes.length > 0 && (
          <div className='mt-3 mx-5'>
            <h1 className='fs-2 fw-bold'>NOTES</h1>
          </div>
        )}
        {notes.length === 0 && (
          <div className='mt-5 justify-content-center d-flex align-items-center'>
            <h1 className='fs-1 fw-bold'>No Notes Found</h1>
          </div>
        )}
        <div className='mt-4 mx-5 row'>
          {notes.map((elem, index) => (
            <div className='col-lg-4 col-md-4 mb-5' key={index}>
              <Notes
                title={elem.title}
                date={new Date(elem.updatedAt).toLocaleDateString()}
                handleUpdate={() => setModalId(elem._id)}
                handleDelete={() => setModalId(elem._id)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  </>
  );
}