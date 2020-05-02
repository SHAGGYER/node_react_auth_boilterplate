import {createContext} from "react";

const ProjectContext = createContext({
    project: null,
    setProject: () => {
    },
    todos: [],
    setTodos: () => {
    },
    channels: [],
    setChannels: () => {
    },
    collaborators: [],
    setCollaborators: () => {
    },
    activeChannel: null,
    setActiveChannel: () => {
    },
    channelData: null,
    activeWindow: null,
    setActiveWindow: () => {
    },
    conferenceUsers: [],
    setConferenceUsers: () => {
    },
    callUser: () => {
    }
});

export default ProjectContext;
