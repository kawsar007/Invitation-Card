
import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// Define the element types
export type ElementType = 'text' | 'image' | 'video' | 'link';

// Define the element interface
export interface Element {
  id: string;
  type: ElementType;
  x: number;
  y: number;
  width: number;
  height: number;
  content: string;
  style?: Record<string, string | number>;
  zIndex: number;
}

// Define the history state
export interface HistoryState {
  past: Element[][];
  present: Element[];
  future: Element[][];
}

// Define the editor state
interface EditorState {
  history: HistoryState;
  selectedElement: string | null;
  showGrid: boolean;
  scale: number;
}

// Define the action types
type Action =
  | { type: 'ADD_ELEMENT'; element: Element }
  | { type: 'UPDATE_ELEMENT'; id: string; updates: Partial<Element> }
  | { type: 'DELETE_ELEMENT'; id: string }
  | { type: 'SELECT_ELEMENT'; id: string | null }
  | { type: 'UNDO' }
  | { type: 'REDO' }
  | { type: 'RESET' }
  | { type: 'TOGGLE_GRID' }
  | { type: 'SET_SCALE'; scale: number }
  | { type: 'SET_VERSION'; version: Element[] };

// Define the context type
interface EditorContextType {
  state: EditorState;
  dispatch: React.Dispatch<Action>;
  addElement: (element: Omit<Element, 'id' | 'zIndex'>) => void;
  updateElement: (id: string, updates: Partial<Element>) => void;
  deleteElement: (id: string) => void;
  selectElement: (id: string | null) => void;
  undo: () => void;
  redo: () => void;
  reset: () => void;
  toggleGrid: () => void;
  setScale: (scale: number) => void;
  setVersion: (version: Element[]) => void;
}

// Create the initial elements
const initialElements: Element[] = [];

// Create the initial state
const initialState: EditorState = {
  history: {
    past: [],
    present: initialElements,
    future: [],
  },
  selectedElement: null,
  showGrid: false,
  scale: 1,
};

// Create the context
const EditorContext = createContext<EditorContextType | undefined>(undefined);

// Reducer function
const editorReducer = (state: EditorState, action: Action): EditorState => {
  switch (action.type) {
    case 'ADD_ELEMENT': {
      const newPresent = [...state.history.present, action.element];
      return {
        ...state,
        history: {
          past: [...state.history.past, state.history.present],
          present: newPresent,
          future: [],
        },
      };
    }
    case 'UPDATE_ELEMENT': {
      const newPresent = state.history.present.map((element) =>
        element.id === action.id ? { ...element, ...action.updates } : element
      );
      return {
        ...state,
        history: {
          past: [...state.history.past, state.history.present],
          present: newPresent,
          future: [],
        },
      };
    }
    case 'DELETE_ELEMENT': {
      const newPresent = state.history.present.filter(
        (element) => element.id !== action.id
      );
      return {
        ...state,
        history: {
          past: [...state.history.past, state.history.present],
          present: newPresent,
          future: [],
        },
        selectedElement: state.selectedElement === action.id ? null : state.selectedElement,
      };
    }
    case 'SELECT_ELEMENT': {
      return {
        ...state,
        selectedElement: action.id,
      };
    }
    case 'UNDO': {
      if (state.history.past.length === 0) return state;
      const previous = state.history.past[state.history.past.length - 1];
      const newPast = state.history.past.slice(0, state.history.past.length - 1);
      return {
        ...state,
        history: {
          past: newPast,
          present: previous,
          future: [state.history.present, ...state.history.future],
        },
      };
    }
    case 'REDO': {
      if (state.history.future.length === 0) return state;
      const next = state.history.future[0];
      const newFuture = state.history.future.slice(1);
      return {
        ...state,
        history: {
          past: [...state.history.past, state.history.present],
          present: next,
          future: newFuture,
        },
      };
    }
    case 'RESET': {
      return {
        ...initialState,
        history: {
          past: [],
          present: initialElements,
          future: [],
        },
      };
    }
    case 'TOGGLE_GRID': {
      return {
        ...state,
        showGrid: !state.showGrid,
      };
    }
    case 'SET_SCALE': {
      return {
        ...state,
        scale: action.scale,
      };
    }
    case 'SET_VERSION': {
      return {
        ...state,
        history: {
          past: [...state.history.past, state.history.present],
          present: action.version,
          future: [],
        },
      };
    }
    default:
      return state;
  }
};

// Create the provider component
export const EditorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(editorReducer, initialState);

  const addElement = (element: Omit<Element, 'id' | 'zIndex'>) => {
    const newElement: Element = {
      ...element,
      id: Math.random().toString(36).substr(2, 9),
      zIndex: state.history.present.length,
    };
    dispatch({ type: 'ADD_ELEMENT', element: newElement });
  };

  const updateElement = (id: string, updates: Partial<Element>) => {
    dispatch({ type: 'UPDATE_ELEMENT', id, updates });
  };

  const deleteElement = (id: string) => {
    dispatch({ type: 'DELETE_ELEMENT', id });
  };

  const selectElement = (id: string | null) => {
    dispatch({ type: 'SELECT_ELEMENT', id });
  };

  const undo = () => {
    dispatch({ type: 'UNDO' });
  };

  const redo = () => {
    dispatch({ type: 'REDO' });
  };

  const reset = () => {
    dispatch({ type: 'RESET' });
  };

  const toggleGrid = () => {
    dispatch({ type: 'TOGGLE_GRID' });
  };

  const setScale = (scale: number) => {
    dispatch({ type: 'SET_SCALE', scale });
  };

  const setVersion = (version: Element[]) => {
    dispatch({ type: 'SET_VERSION', version });
  };

  const value = {
    state,
    dispatch,
    addElement,
    updateElement,
    deleteElement,
    selectElement,
    undo,
    redo,
    reset,
    toggleGrid,
    setScale,
    setVersion,
  };

  return <EditorContext.Provider value={value}>{children}</EditorContext.Provider>;
};

// Create a hook to use the context
export const useEditor = (): EditorContextType => {
  const context = useContext(EditorContext);
  if (context === undefined) {
    throw new Error('useEditor must be used within an EditorProvider');
  }
  return context;
};
