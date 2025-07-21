import { useEffect, useState } from "react";
import { Button, TextField, Typography, Box, Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import FeedCard from "./FeedCard";
import axios from "axios";
import { addUser } from "../utils/userslice";
import { base_url } from "../utils/baseUrl";

export default function Profile() {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [photos, setPhotoUrl] = useState("");
  const [about, setAbout] = useState("");
  const [showtost, setshowtost] = useState(false);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setError("")
      const response = await axios.patch(
        base_url+"/profile/update",
        {
          firstName,
          lastName,
          age: Number(age),
          gender,
          photos,
          about,
        },
        { withCredentials: true }
      );

      dispatch(addUser(response.data.data));
      setshowtost(true);
      setTimeout(() => {
        setshowtost(false);
      }, 3000);
    } catch (error) {
      setError(error.message);
      console.error(error);
    }
  };
  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setAge(user.age || "");
      setGender(user.gender || "");
      setAbout(user.about || "");
      setPhotoUrl(user.photos || "");
    }
  }, [user]);

  return (
    user && (
      <div className="flex justify-center items-center gap-5">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
          sx={{
            background: "linear-gradient(to right, #ece9e6, #ffffff)",
          }}
        >
          <Paper
            elevation={4}
            sx={{
              p: 5,
              width: 380,
              borderRadius: 4,
              background: "#fff",
              boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
            }}
          >
            <Typography
              variant="h4"
              textAlign="center"
              color="primary.main"
              mb={2}
              fontWeight={600}
            >
              Your Profile
            </Typography>

            {error && (
              <Typography
                variant="body2"
                color="error"
                mb={2}
                textAlign="center"
                sx={{ textTransform: "capitalize" }}
              >
                {error + " Please try again"}
              </Typography>
            )}

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="First Name"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                margin="normal"
                required
              />

              <TextField
                fullWidth
                label="Last Name"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Age"
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Gender"
                type="text"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Photo"
                type="text"
                value={photos}
                onChange={(e) => setPhotoUrl(e.target.value)}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="about"
                type="text"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                margin="normal"
                required
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                sx={{ mt: 3 }}
              >
                Save Profile
              </Button>
            </form>
          </Paper>
        </Box>
        <FeedCard user={{ firstName, lastName, age, about, photos, gender }} />
        {showtost && (
          <div className="toast toast-top toast-center">
            <div className="alert alert-success">
              <span>Profile update successfully.</span>
            </div>
          </div>
        )}
      </div>
    )
  );
}
