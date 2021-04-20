import React from 'react';

const Header = ({course}) => {
  //console.log(course);
  return (
    <div>
      <h1>
        {course.name}
      </h1>
    </div>
  )
}

const Part = ({part, exercises, id}) => {
  //console.log(id);
  return(
    <p>
      {part} {exercises}
    </p>
  )
}

const Content = ({course}) => {
  return (
    <div>
      {course.parts.map(part => 
        <Part key={part.id} part={part.name} exercises={part.exercises}/>
      )}
    </div>
  )
}

/*
const Total = (props) => {
  //console.log(props);
  return (
    <div>
      <p>Number of exercises {props.course.parts[0].exercises + props.course.parts[1].exercises + props.course.parts[2].exercises}</p>
    </div>
  )
}
*/

const Course = ({course}) => {
  return(
    <>
    <Header course={course}/>
    <Content course={course}/>
    </>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

export default App;