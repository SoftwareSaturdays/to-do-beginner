// To-do list
Vue.component('todo-list', {
    data: function() {
        return {
            next_todo_txt: '',
        }
    },
    template: `
    <div class="todo-list-wrapper">
        <slot></slot>
        <br />
        <div class="todo-item-wrapper">
            <input v-model="next_todo_txt" placeholder="New ToDo...">
            <div class="button button-add" v-on:click="new_todo">
                Add
            </div>
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
        <div class="button button-done" v-on:click="done_todo">Done!</div>
        <div class="todo-item-text-wrapper">
            <input v-if="edit" v-model="todo.text" class="todo-item-text-interior"/>
            <div v-if="!edit" class="todo-item-text-interior">{{todo.text}}</div>
        </div>
        <div v-if="edit" class="button button-edit" v-on:click="save_todo">Save</div>
        <div v-if="!edit" class="button button-edit" v-on:click="edit_todo">Edit</div>
        <div class="button button-delete" v-on:click="delete_todo">Delete</div>
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
        },
        done_todo: function() {
            this.$emit('done', this.todo.id);
        }
    },
});

// To-do finished
Vue.component('todo-finished', {
    props: ['todo'],
    template: `
    <div class="todo-finished-wrapper">
        <div class="button button-edit"v-on:click="restore_todo">Restore</div>
        <div class="todo-finished-text-wrapper">    
            {{todo.text}}
        </div>
        <div class="button button-delete" v-on:click="delete_todo">Delete</div>
    </div>
    `,
    methods: {
        delete_todo: function() {
            this.$emit('delete', this.todo.id);
        },
        restore_todo: function() {
            this.$emit('restore', this.todo.text);
            this.$emit('delete', this.todo.id);
        }
    }
})

const vm = new Vue({
    el: '#app',
    data: {
        todolist: [
            {id: 0, text: 'Finish this website'},
            {id: 1, text: 'Make slides for Software Saturday'},
            {id: 2, text: 'Teach VueJS'},
        ],
        finished_todo: [

        ],
        next_todo_id: 3,
        next_finished_id: 0,
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
            let index = -1;
            this.todolist.forEach(element => {
                if(element.id == toUpdate)
                    index = this.todolist.indexOf(element);
            });
            // Edit the database here...
        },
        handle_done: function(toFinish) {
            let index = -1;
            this.todolist.forEach(element => {
                if(element.id == toFinish)
                    index = this.todolist.indexOf(element);
            });
            this.finished_todo.push({id:this.next_finished_id, text:this.todolist[index].text});
            // Edit the database here...
            this.next_finished_id++;
            this.todolist.splice(index, 1);
        },
        finished_handle_delete: function(toDelete) {
            let index = -1;
            this.finished_todo.forEach(element => {
                if(element.id == toDelete)
                    index = this.todolist.indexOf(element);
            });
            this.finished_todo.splice(index, 1);
            // Edit the database here...
        },
    },
});
