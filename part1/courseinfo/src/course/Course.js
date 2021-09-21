import React from "react";
import Header from "./header/Header";
import Part from "./part/Part";
import Total from "./total/Total";

function Course({ course }) {
    let total = course.parts.map(p => p.exercises).reduce((a, b) => a + b)
    return (
        <div>
            <Header course={course.name}/>
            {course.parts.map(part =>
                <Part key={part.id} part={part.name} exercises={part.exercises}/>
            )}
            <Total total={total}/>
        </div>
    )
}

export default Course
