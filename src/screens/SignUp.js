import Container from "react-bootstrap/Container";
import InputField from "../components/InputField";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { SignUpValidation } from "../validations/AuthValidation";
import "./../styles/signup.scss";
import chatLogo from "./../assets/chatLogo.png";
import { socket, connectUser, getRegisteredUsers } from "../socket/SocketIo";
import { useSelector, useDispatch } from "react-redux";
import { addConnectedUser, setConnectedUsers } from "../store/chatSlice";
import { setLoggedIn, addUserData, setConnected } from "../store/userStatus";

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);

  const connectedUsers = useSelector((state) => state.chat.connectedUsers);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleShow = (data) => {
    setFormData({
      email: data.email,
      password: data.password,
    });
  };

  const handleChange = async (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFieldValue(name, value);
  };

  const initRequest = async () => {
    connectUser(values);

    dispatch(setLoggedIn());
    dispatch(setConnected());
    dispatch(addUserData(values));

    //// Update connected users on the store /////
    socket.on("emit-connected-user-list", (serverData) => {
      dispatch(setConnectedUsers(serverData));
    });

    // setTimeout(() => {
    //   if (socket.io.engine) {
    //     // close the low-level connection and trigger a reconnection
    //     socket.io.engine.close();
    //   }
    // }, 10000);

    navigate("/chat-box");
  };

  const { values, errors, handleSubmit, setFieldValue, touched } = useFormik({
    initialValues: { name: "", email: "", phone: "" },
    validationSchema: SignUpValidation,
    onSubmit: () => initRequest(),
  });

  return (
    <>
      <Container fluid style={{ backgroundColor: "#8BABD8", height: "100vh" }}>
        <div className="row">
          <div className="col-md-4 col-12"></div>
          <div className="col-md-4 col-sm-12">
            <div className="signup-wrapper">
              <div className="text-center">
                <img src={chatLogo} className="img-fluid" />
              </div>

              <div className="form-wrapper">
                <div className="mt-4">
                  <InputField
                    type="text"
                    label="Name"
                    value={values.name}
                    name="name"
                    error={Boolean(errors.name)}
                    errorText={errors.name}
                    onChange={handleChange}
                    placeholder="Name"
                  />
                </div>

                <div className="mt-4">
                  <InputField
                    type="email"
                    label="Email"
                    value={values.email}
                    name="email"
                    error={Boolean(errors.email)}
                    errorText={errors.email}
                    onChange={handleChange}
                    placeholder="Email"
                  />
                </div>

                <div className="mt-4">
                  <InputField
                    type="text"
                    label="Phone"
                    value={values.phone}
                    name="phone"
                    error={Boolean(errors.phone)}
                    errorText={errors.phone}
                    onChange={handleChange}
                    placeholder="Phone"
                  />
                </div>

                <div className="form-group mt-4">
                  <button
                    type="button"
                    disabled={isLoading}
                    onClick={() => {
                      handleSubmit();
                    }}
                    className="btn-block signup-btn"
                  >
                    {!isLoading ? (
                      <>
                        <span>Sign Up</span>
                      </>
                    ) : (
                      <>
                        <span>
                          <div className="spinner-border text-light spinner-border-sm"></div>
                        </span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default SignUp;
