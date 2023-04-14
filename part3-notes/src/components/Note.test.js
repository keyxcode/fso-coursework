import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Note from "./Note";

test("renders content", () => {
  const note = {
    content: "Component testing is done with react-testing-library",
    important: true,
  };

  // render() renders the components in a format that is suitable for tests without rendering them to the DOM.
  render(<Note note={note} />);

  // use the object screen to access the rendered component
  // use screen's getByText() to search for an element that has the note content and ensure that it exists
  const element = screen.getByText(
    "Component testing is done with react-testing-library"
  );
  expect(element).toBeDefined();

  // another method is to use CSS selectors to find the rendered element
  // the object container is one of the fields returned by render()
  const { container } = render(<Note note={note} />);

  const div = container.querySelector(".note");
  expect(div).toHaveTextContent(
    "Component testing is done with react-testing-library"
  );

  // useful method that prints the HTML of a component to the terminal
  screen.debug();
});

test("clicking the button calls event handler once", async () => {
  const note = {
    content: "Component testing is done with react-testing-library",
    important: true,
  };

  // The event handler is a mock function defined with Jest:
  const mockHandler = jest.fn();

  render(<Note note={note} toggleImportance={mockHandler} />);

  // A session is started to interact with the rendered component
  const user = userEvent.setup();
  const button = screen.getByText("make not important");
  // Clicking happens with the method click() of the userEvent-library
  await user.click(button);

  // verify that the method gets called exactly once
  expect(mockHandler.mock.calls).toHaveLength(1);
});
