import React, { useState } from 'react';
import shortid from "shortid";
import { API, graphqlOperation } from 'aws-amplify';
import { getNote, listNotes } from '../graphql/queries/queries';
import { newNote, deleteNote } from '../graphql/mutations/mutations';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import '../styles/style.css';

export default function App() {

  const [note, setNote] = useState(null);
  const [id1, setId1] = useState(null);
  const [id, setId] = useState(null);
  const [name, setName] = useState(null);
  const [content, setContent] = useState(null);
  const [id2, setId2] = useState(null);

  const queryGetNote = async (id) => {
    const note = await API.graphql(graphqlOperation(getNote, { id: id }));
    setNote(note);
  }

  const queryListNotes = async () => {
    const note = await API.graphql(graphqlOperation(listNotes));
    setNote(note);
  }

  const queryNewNote = async (id, name, content, author) => {
    const note = await API.graphql(graphqlOperation(newNote, {id: id, name: name, content: content, author: author}));
    setNote(note);
  }

  const queryDeleteNote = async (id) => {
    const note = await API.graphql(graphqlOperation(deleteNote, { id: id }));
    setNote(note);
  }

  const viewGetNote = () => {
    if(note) {
      return (
        <div id="note">
            <h3>{note.data.getNote.name}</h3>
            <p>{note.data.getNote.content}</p>
            <h4> - <i>{note.data.getNote.author}</i></h4>
            <p>-- {note.data.getNote.id} --</p>
        </div>
      )
    }
  }

  const viewListNotes = () => {
    if(note) {
      return (
        <div>
          {note.data.listNotes.map(note =>
          <div key={shortid.generate()} id="note">
            <h3>{note.name}</h3>
            <p>{note.content}</p>
            <h4> - <i>{note.author}</i></h4>
            <p>-- {note.id} --</p>
          </div>
          )
        }
        </div>
      )
    }
  }

  const viewNewNote = () => {
    if(note) {
      return (
        <div id="note">
            <h3>{note.data.newNote.name}</h3>
            <p>{note.data.newNote.content}</p>
            <h4> - <i>{note.data.newNote.author}</i></h4>
            <p>-- {note.data.newNote.id} --</p>
        </div>
      )
    }
  }

  const viewDeleteNote = () => {
    if(note) {
      return (
        <div id="note">
            <p>Deleted Note with id {note.data.deleteNote} </p>
        </div>
      )
    }
  }

  return (
    <div className="App">
      <Authenticator signUpAttributes={['email']}>
        {({ signOut, user }) => (
          <main>
            <section id="header">
            <h1 id="title">Hello <span>{user.username}</span></h1>
            <button onClick={signOut}>Sign out</button><br/><br/>
            </section>
            <section id="form">
              <form onSubmit={(e) => {queryGetNote(id1); e.preventDefault();}}>
                <input
                required
                type="text"
                placeholder="id"
                value={id1}
                onChange={(e) => {
                  setId1(e.target.value);
                }}
                /><br/>
                <button>
                  Get note
                </button><br/>
              </form>
              {note ? note.data["getNote"] !== undefined ? viewGetNote() : <p></p> : null}

              <button onClick={() => {queryListNotes();}}>
                List notes
              </button><br/><br/>
              {note ? note.data["listNotes"] !== undefined ? viewListNotes() : <p></p> : null}

              <form onSubmit={(e) => {queryNewNote(id, name, content, user.username); e.preventDefault();}}>
                <input
                type="text"
                placeholder="id"
                value={id}
                onChange={(e) => {
                  setId(e.target.value);
                }}
                /><br/>
                <input
                type="text"
                required
                placeholder="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                /><br/>
                <input
                required
                type="text"
                placeholder="content"
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);
                }}
                /><br/>
                <button>
                  Post note
                </button><br/>
              </form>
              {note ? note.data["newNote"] !== undefined ? viewNewNote() : <p></p> : null}

              <form onSubmit={(e) => {queryDeleteNote(id2); e.preventDefault();}}>
                <input
                required
                type="text"
                placeholder="id"
                value={id2}
                onChange={(e) => {
                  setId2(e.target.value);
                }}
                /><br/>
                <button>
                  Delete note
                </button><br/>
              </form>
              {note ? note.data["deleteNote"] !== undefined ? viewDeleteNote() : <p></p> : null}
              (You have to be in the Group "Writer" to use "Post note" and "Delete note")
            </section>
          </main>
        )}
      </Authenticator>
    </div>
  );
}