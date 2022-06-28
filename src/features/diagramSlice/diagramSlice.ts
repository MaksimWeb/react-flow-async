import { initialEdges } from './../../data/edges';
import { initialNodes } from './../../data/nodes';
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Edge, Node } from 'react-flow-renderer';

interface Res<T> {
  result: T;
  status: string;
}

interface MyState {
  nodes: Node[];
  edges: Edge[];
}

export const getNodes = createAsyncThunk(
  'diagram/getNodes',
  async (_, thunkApi) => {
    const res = await fetch('http://localhost:3001/nodes');
    const data = await res.json();
    return data;
  }
);

export const getEdges = createAsyncThunk(
  'diagram/getEdges',
  async (_, thunkApi) => {
    const res = await fetch('http://localhost:3001/edges');
    const data = await res.json();
    return data;
  }
);

const initialState: MyState = {
  nodes: [],
  edges: [],
};

export const diagramSlice = createSlice({
  name: 'diagram',
  initialState,
  reducers: {
    // getNodes: (state, action: PayloadAction<Node[]>) => {
    //   state.nodes = action.payload;
    // },
    // getEdges: (state, action: PayloadAction<Edge[]>) => {
    //   state.edges = action.payload;
    // },
  },
  extraReducers: {
    [getNodes.fulfilled.type]: (state, action: PayloadAction<Node[]>) => {
      state.nodes = action.payload;
    },
    [getEdges.fulfilled.type]: (state, action: PayloadAction<Edge[]>) => {
      state.edges = action.payload;
    },
  },
});

export default diagramSlice.reducer;
