import { ADD_ARTICLE } from "../constants/action-types";
import { UPDATE_ARTICLE } from "../constants/action-types";
import { SELECT_ARTICLE } from "../constants/action-types";
import { DELETE_ARTICLE } from "../constants/action-types";

import { OPEN_FORM } from "../constants/action-types";
import { CLOSE_FORM } from "../constants/action-types";
import { OPEN_EDIT_FORM } from "../constants/action-types";
import { CLOSE_EDIT_FORM } from "../constants/action-types";
const initialState = {
  //Read
  articles: [
    {
      title: "Gingerbread Mug Mates",
      id: 0,
      date: "November 20, 2018"
    },
    {
      title: "Gingerbread House: Basic Dough",
      id: 1,
      date: "November 7, 2018"
    }
  ],
  uiState: {
    //Create
    openFormDialog: false,
    //Update
    openEditDialog: false,
    articleToEdit: {},
    //Delete
    checked: []
  }
};
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    //CREAT

    case ADD_ARTICLE:
      console.log("Add new " + JSON.stringify(action));
      return {
        ...state,
        articles: [...state.articles, action.payload]
      };

    case OPEN_FORM:
      console.log("Open Add Form" + JSON.stringify(action));
      return {
        ...state,
        uiState: {
          ...state.uiState,
          openFormDialog: true
        }
      };

    case CLOSE_FORM:
      console.log("Close Add Form" + JSON.stringify(action));
      return {
        ...state,
        uiState: {
          ...state.uiState,
          openFormDialog: false
        }
      };
    //UPDATE
    case UPDATE_ARTICLE:
      console.log("Save updated" + JSON.stringify(action));

      return {
        ...state,
        articles: state.articles.map(article => {
          if (article.id !== action.payload.id) {
            return article;
          } else {
            return { ...article, title: action.payload.title };
          }
        })
      };

    case OPEN_EDIT_FORM:
      console.log("Open Edit Form" + JSON.stringify(action));
      return {
        ...state,
        uiState: {
          ...state.uiState,
          openEditDialog: true,
          articleToEdit: action.payload
        }
      };

    case CLOSE_EDIT_FORM:
      console.log("Close Edit Article Form" + JSON.stringify(action));
      return {
        ...state,
        uiState: {
          ...state.uiState,
          openEditDialog: false
        }
      };

    //DELETE
    case SELECT_ARTICLE:
      console.log("@@@@Select" + JSON.stringify(action));
      const currentIndex = state.uiState.checked.indexOf(action.payload);
      if (currentIndex === -1) {
        state.uiState.checked.push(action.payload);
      } else {
        state.uiState.checked.splice(currentIndex, 1);
      }
      return state;

    case DELETE_ARTICLE:
      // for (var article in state.articles) {
      for (var check in state.uiState.checked) {
        //remove article
        var article = state.articles[check];
        state.articles.splice(check, 1);

        //Remove Index
        var index = state.uiState.checked.indexOf(check);
        if (index > -1) {
          state.uiState.checked.splice(index, 1);
        }
      }
      state.uiState.checked = [];
      return state;

    default:
      return state;
  }
};
export default rootReducer;
