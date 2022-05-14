import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoListComponent } from './pages/todo-list/todo-list.component';
import { TodoDetailsComponent } from './pages/todo-details/todo-details.component';
import { AddTodoComponent } from './pages/add-todo/add-todo.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { TaskComponent } from './components/task/task.component';
import { DeletedPipe, FilterTitlePipe, StatePipe } from './directives/filter-title.pipe';
import { FilterDatePipe } from './directives/filter-date.pipe';
import { FilterGroupsPipe } from './directives/filter-groups.pipe';

@NgModule({
	declarations: [
		AppComponent,
		TodoListComponent,
		TodoDetailsComponent,
		AddTodoComponent,
		SideMenuComponent,
		TaskComponent,
		FilterTitlePipe,
		DeletedPipe,
		StatePipe,
		FilterDatePipe,
		FilterGroupsPipe
	],
	imports: [BrowserModule, AppRoutingModule, NgSelectModule, FormsModule, ReactiveFormsModule],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
