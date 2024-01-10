import React from "react";

import { Action, IPost, RootState } from "@/Interfaces";

const PostsContext = React.createContext({});
export default PostsContext;

function postsReducer(state: RootState, action: Action) {
  switch (action.type) {
    case "addPosts": {
      const newPosts = [...state];
      action.posts.forEach((post: IPost) => {
        const exists = newPosts.find((p) => p._id === post._id);
        if (!exists) {
          newPosts.push(post);
        }
      });
      return newPosts;
    }
    case "deletePost": {
      const newPosts = [] as IPost[];
      state.forEach((post: IPost) => {
        if (post._id !== action.postId) {
          newPosts.push(post);
        }
      });
      return newPosts;
    }
    default:
      return state;
  }
}

export const PostsProvider = ({ children }: { children: JSX.Element }) => {
  const [posts, dispatch] = React.useReducer(postsReducer, []);
  const [noMorePosts, setNoMorePosts] = React.useState(false);

  const deletePost = React.useCallback((postId: string) => {
    dispatch({
      type: "deletePost",
      postId,
    });
  }, []);

  const setPostsFromSSR = React.useCallback((postsFromSSR = []) => {
    dispatch({
      type: "addPosts",
      posts: postsFromSSR,
    });
  }, []);

  const getPosts = React.useCallback(
    async ({ lastPostDate, getNewerPosts = false }: { lastPostDate: IPost; getNewerPosts: boolean }) => {
      const result = await fetch(`/api/getPosts`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ lastPostDate, getNewerPosts }),
      });
      const json = await result.json();
      const postsResult = json.posts || [];
      if (postsResult.length < 5) {
        setNoMorePosts(true);
      }
      dispatch({
        type: "addPosts",
        posts: postsResult,
      });
    },
    []
  );

  return (
    <PostsContext.Provider value={{ posts, setPostsFromSSR, getPosts, noMorePosts, deletePost }}>
      {children}
    </PostsContext.Provider>
  );
};
