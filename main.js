// To-do list
Vue.component('todo-list', {
    data: function() {
        return {
            next_todo_txt: ''
        }
    },
    template: `
    <div>
        <slot></slot>
        <br />
        <input v-model="next_todo_txt" placeholder="New ToDo...">
        <div class="button" v-on:click="new_todo">
            Add
        </div>
    </div>
    `,
    methods: {
        new_todo: function() {
            this.$emit('add', this.next_todo_txt);
            this.next_todo_txt = '';
        },
    }
})

// To-do item
Vue.component('todo-item', {
    props: ['todo'],
    template: `
    <div class="todo-item-wrapper">
        <div class="button" v-on:click="">Done!</div>
        <div>{{todo.text}}</div>
        <div class="button" v-on:click="">Edit</div>
        <div class="button" v-on:click="">Delete</div>
    </div>
    `
});

const vm = new Vue({
    el: '#app',
    data: {
        todolist: [
            {id: 0, text: 'Finish this website'},
            {id: 1, text: 'Make slides for Software Saturday'},
            {id: 2, text: 'Teach VueJS'},
        ],
        next_todo_id: 3,
    },
    methods: {
        new_todo: function(newTodo) {
            console.log("adding")
            this.todolist.push({id:this.next_todo_id, text:newTodo});
            this.next_todo_id++;
        }
    },
});