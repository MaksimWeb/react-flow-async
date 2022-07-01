import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { initialEdges } from "./../../data/edges";
import { initialNodes } from "./../../data/nodes";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Edge, Node } from "react-flow-renderer";

interface Res<T> {
  result: T;
  status: string;
}

interface MyState {
  nodes: Node[];
  edges: Edge[];
}

// export const getNodes = createAsyncThunk(
//   "diagram/getNodes",
//   async (_, thunkApi) => {
//     const res = await fetch("http://localhost:3001/nodes");
//     const data = await res.json();
//     thunkApi.dispatch(setNodes(data));
//   }
// );

// export const getEdges = createAsyncThunk(
//   "diagram/getEdges",
//   async (_, thunkApi) => {
//     const res = await fetch("http://localhost:3001/edges");
//     const data = await res.json();
//     thunkApi.dispatch(setEdges(data));
//   }
// );

// export const updateEdges = createAsyncThunk<Edge[], Edge[]>(
//   "diagram/updateEdges",
//   async (userData, thunkApi) => {
//     const u = JSON.stringify(userData);
//     const res = await fetch("http://localhost:3001/edges/e1-2", {
//       method: "PUT",
//       body: u,
//     });
//     return (await res.json()) as Edge[];
//   }
// );

// const initialState: MyState = {
//   nodes: [],
//   edges: [],
// };

// export const diagramSlice = createSlice({
//   name: "diagram",
//   initialState,
//   reducers: {
//     setNodes: (state, action: PayloadAction<Node[]>) => {
//       state.nodes = action.payload;
//     },
//     setEdges: (state, action: PayloadAction<Edge[]>) => {
//       state.edges = action.payload;
//     },
//   },
//   extraReducers: {
//     // [getNodes.fulfilled.type]: (state, action: PayloadAction<Node[]>) => {
//     //   state.nodes = action.payload;
//     // },
//     // [getEdges.fulfilled.type]: (state, action: PayloadAction<Edge[]>) => {
//     //   state.edges = action.payload;
//     // },
//     [updateEdges.fulfilled.type]: (state, action) => {
//       console.log(action);
//     },
//   },
// });

// const { setNodes, setEdges } = diagramSlice.actions;

// export default diagramSlice.reducer;

export interface Diagram {
  id: number;
  diagram: [
    {
      nodes: Node[];
    },
    {
      edges: Edge[];
    }
  ];
}

type DType<T> = {
  [K in keyof T]: T[K];
};

export const diagramApi = createApi({
  reducerPath: "diagramApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/" }),
  refetchOnFocus: true,
  keepUnusedDataFor: 30,
  tagTypes: ["Diagram"],
  endpoints: (builder) => ({
    getDiagram: builder.query<DType<Diagram>, void>({
      query: () => `diagram`,
      providesTags: ["Diagram"],
    }),
    saveDiagram: builder.mutation<any, DType<Diagram>>({
      query: ({ id, ...rest }) => ({
        url: `diagram/${id}`,
        method: "PUT",
        body: rest,
      }),
      invalidatesTags: ["Diagram"],
    }),
  }),
});

export const { useGetDiagramQuery, useSaveDiagramMutation } = diagramApi;
