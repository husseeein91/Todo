import { useSelector, connect } from "react-redux";
import PropTypes from "prop-types";
import { addTodo, removeTodo, updateTodo } from "./actions";
import { useState, useEffect, useRef } from "react";
import {
  TextField,
  Button,
  Container,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  FormGroup,
  IconButton,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Scrollbars } from "react-custom-scrollbars";
import "./style.css";

function App({ addTodo, removeTodo, updateTodo }) {
  const toDos = useSelector((state) => state);
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (description === "") {
      alert("invalid ToDo");
    } else {
      addTodo(description);
      setDescription("");
    }
  };

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, [toDos]);

  const renderThumb = () => {
    const thumbStyle = {
      borderRadius: 6,
      backgroundColor: "#1565c0cc",
    };
    return <div style={{ ...thumbStyle }} />;
  };

  return (
    <Container
      sx={{
        boxSizing: "border-box",
        padding: "10px",
        backgroundColor: "#fafafa",
        borderRadius: "6px",
        marginTop: "30px",
      }}
      maxWidth="sm"
    >
      <div className="App">
        <Container maxWidth="sm" align="center">
          <Typography
            fontFamily="Segoe UI Symbol"
            mt={2}
            mb={2}
            variant="h3"
            color="primary"
          >
            ToDo App
          </Typography>
          <form onSubmit={(e) => handleSubmit(e)}>
            <FormGroup>
              <TextField
                inputRef={inputRef}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                variant="outlined"
                fullWidth
                label="Add ToDo"
                sx={{ margin: "5px 0" }}
                required
                focused
              />
              <Button align="right" type="submit" variant="contained">
                Add Todo
              </Button>
            </FormGroup>
          </form>
          <Scrollbars
            style={{ width: "100%", padding: "5px", height: "300px" }}
            renderThumbHorizontal={renderThumb}
            renderThumbVertical={renderThumb}
          >
            <List>
              {toDos.length > 0 ? (
                toDos.map((todo) => (
                  <ListItem
                    disablePadding
                    sx={{ paddingRight: "10px" }}
                    key={todo.id}
                  >
                    <ListItemButton
                      sx={todo.resolved ? { backgroundColor: "#f5f5f7" } : {}}
                      onClick={() => updateTodo(todo.id)}
                    >
                      <ListItemText
                        primary={todo.description}
                        primaryTypographyProps={
                          todo.resolved
                            ? {
                                style: {
                                  textDecoration: "line-through",
                                },
                              }
                            : {}
                        }
                        secondary={todo.resolved ? "Resolved" : "Not Resolved"}
                        secondaryTypographyProps={
                          !todo.resolved
                            ? { color: "#b71c1c" }
                            : { color: "#357a38" }
                        }
                      />
                    </ListItemButton>
                    <IconButton
                      size="small"
                      variant="contained"
                      color="primary"
                      onClick={() => removeTodo(todo.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItem>
                ))
              ) : (
                <ListItem>
                  <ListItemText
                    align="center"
                    primary="You Have Nothing ToDo"
                  />
                </ListItem>
              )}
            </List>
          </Scrollbars>
        </Container>
      </div>
    </Container>
  );
}

App.prpTypes = {
  addTodo: PropTypes.func.isRequired,
  removeTodo: PropTypes.func.isRequired,
  updateTodo: PropTypes.func.isRequired,
};

export default connect(null, { addTodo, removeTodo, updateTodo })(App);
