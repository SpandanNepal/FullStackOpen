import React from 'react';

const Header = ({course}) => {
  //console.log(course)
  return (
    <div>
      <h2>
        {course.name}
      </h2>
    </div>
  )
}

const Part = ({part, exercises}) => {
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

const Total = ({course}) => {
  let sumArr = course.parts.map(exercise => exercise.exercises)
  let sum = sumArr.reduce(function(a, b){return a + b});
  return (
    <div>
      <p><strong>Number of exercises {sum}</strong></p> 
    </div>
  )
}

const Course = ({course}) => {
  return(
    <>
    <Header course={course}/>
    <Content course={course}/>
    <Total course={course}/>
    </>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <h1>
        Web development curriculum
      </h1>
      {
        courses.map(course =>
          <Course key={course.id}course={course} />
        )
      }
      
    </div>
    
  ) 
  
}

export default App;