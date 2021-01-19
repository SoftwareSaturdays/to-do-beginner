// To-do list
Vue.component('todo-list', {
    data: function() {
        return {
            next_todo_txt: '',
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
        <div v-if="blank">
            Please enter a To-Do task.
        </div>
    </div>
    `,
    methods: {
        new_todo: function() {
            if(this.blank) return;
            this.$emit('add', this.next_todo_txt);
            this.next_todo_txt = '';
        },
    },
    computed: {
        blank: function(){
            return this.next_todo_txt == '';
        }
    },
})

// To-do item
Vue.component('todo-item', {
    props: ['todo'],
    data: function() {
        return {
            edit: false,
        }
    },
    template: `
    <div class="todo-item-wrapper">
        <div class="button" v-on:click="">Done!</div>
        <input v-if="edit" v-model="todo.text" />
        <div v-if="!edit">{{todo.text}}</div>
        <div v-if="!edit" class="button" v-on:click="edit_todo">Edit</div>
        <div v-if="edit" class="button" v-on:click="save_todo">Save</div>
        <div class="button" v-on:click="delete_todo">Delete</div>
    </div>
    `,
    methods: {
        delete_todo: function() {
            this.$emit('delete', this.todo.id);
        },
        edit_todo: function() {
            this.edit = true;
        },
        save_todo: function() {
            this.edit = false;
            this.$emit('edit', this.todo.id);
        }
    },
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
            this.todolist.push({id:this.next_todo_id, text:newTodo});
            // Edit the database here...
            this.next_todo_id++;
        },
        handle_delete: function(toDelete) {
            let index = -1;
            this.todolist.forEach(element => {
                if(element.id == toDelete)
                    index = this.todolist.indexOf(element);
            });
            this.todolist.splice(index, 1);
            // Edit the database here...
        },
        handle_edit: function(toUpdate) {
            // Edit the database here...
        },
    },
});