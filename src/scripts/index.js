import '../css/reset.css';
import '../css/style.css';

// import { format, compareAsc } from 'date-fns';
// import { v4 as uuidv4} from 'uuid';

import Project from './project';

const p1 = new Project("Test", 123);

const testTodo = {
    title: "Test",
    description: "Test",
    dueDate: "Test",
    priority: "Test",
    note: "Test", 
    isComplete: false
}


p1.addTodo(testTodo);

p1.log();




