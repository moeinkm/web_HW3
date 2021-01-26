import React, { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import { useFormik } from "formik";
import FormikInput from "src/reusable/FormikInput";
import { validationSchema } from "./validation";
import request from "../../services/request";
import { useDispatch, useSelector } from "react-redux";
import { SAVE_POSTS } from "../../store";
import {
  StyledName,
  StyleImg,
  StyledTitle,
  StyledDescription,
  StyledButton,
} from "./style";
import ProfileImage from "src/image/profile.png";

export default function Posts({ isProfile }) {
  const [showModal, setShowModal] = useState(false);
  const [postData, setPostData] = useState(null);
  const [isProfileStatus, setIsProfileStatus] = useState(false);
  const handleAddPost = () => {
    setShowModal(true);
  };

  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);

  const handleDelete = async (id) => {
    const result = await request.post("/api/posts/delete", { id });
    if (result.ok) {
      handleReceivePosts();
    }
  };
  const handleReceivePosts = async () => {
    const result = await request.get(
      isProfile ? "/api/posts/me" : "/api/posts/"
    );
    if (result.ok) {
      dispatch({ type: "SAVE_POSTS", posts: result.data });
    }
  };

  useEffect(() => {
    (!postData || isProfileStatus !== isProfile) && handleReceivePosts();
    postData !== posts && setPostData(posts);
    isProfileStatus !== isProfile && setIsProfileStatus(isProfile);
  }, [postData, posts, isProfile]);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const result = await request.post("/api/posts/add", values);
      if (result?.ok) {
        handleReceivePosts();
        setShowModal(false);
      }
    },
  });

  return (
    <>
      {isProfile ? (
        <h3 style={{ marginLeft: 20 }}>My Profile</h3>
      ) : (
        <Button
          type="primary"
          style={{ marginLeft: 20 }}
          onClick={handleAddPost}
        >
          Add New Post
        </Button>
      )}
      {postData &&
        postData.map((i) => (
          <div
            style={{
              backgroundColor: "#fff",
              padding: 10,
              margin: "10px 20px",
              borderRadius: "8px",
            }}
          >
            <StyledName>
              <StyleImg src={ProfileImage} />
              {i.username}
              {isProfile && (
                <StyledButton
                  type={"primary"}
                  onClick={() => handleDelete(i._id)}
                >
                  Delete
                </StyledButton>
              )}
            </StyledName>
            <StyledTitle> {i.title}</StyledTitle>
            <StyledDescription>{i.description}</StyledDescription>
          </div>
        ))}
      <Modal
        visible={showModal}
        title="Title"
        centered
        onOk={() => setShowModal(false)}
        onCancel={() => setShowModal(false)}
        footer={null}
      >
        <p>please add new post...</p>
        <form onSubmit={formik.handleSubmit}>
          <FormikInput
            type="text"
            name="title"
            formik={formik}
            label={"Title"}
          />
          <FormikInput
            type="text"
            name="description"
            isTextArea={true}
            formik={formik}
            label={"Description"}
          />
          <Button
            style={{ margin: "10px 0 0 15px" }}
            htmlType={"submit"}
            type={"primary"}
          >
            Save
          </Button>
        </form>
      </Modal>
    </>
  );
}
