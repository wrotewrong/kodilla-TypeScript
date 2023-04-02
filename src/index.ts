const inquirer = require('inquirer');
const consola = require('consola');

enum Action {
  List = 'list',
  Add = 'add',
  Remove = 'remove',
  Quit = 'quit',
}

type InquirerAnswers = {
  action: Action;
};

const startApp = () => {
  inquirer
    .prompt([
      {
        name: 'action',
        type: 'input',
        message: 'How can I help you?',
      },
    ])
    .then(async (answers: InquirerAnswers) => {
      console.log('Chosen action: ' + answers.action);
      startApp();
      if (answers.action === 'quit') return;
    });
};

startApp();

enum MessageVariant {
  Success = 'success',
  Error = 'error',
  Info = 'info',
}

class Message {
  private content: string;

  constructor(content: string) {
    this.content = content;
  }

  public show(): void {
    console.log(this.content);
  }

  public capitalize(): void {
    const splitContent: string[] = this.content.split('');
    const first = splitContent[0].toUpperCase();
    splitContent.shift();
    const rest = splitContent.join('').toLowerCase();
    this.content = first + rest;
  }

  public toUpperCase(): void {
    this.content = this.content.toUpperCase();
  }

  public toLowerCase(): void {
    this.content = this.content.toLowerCase();
  }

  static showColorized(variant: MessageVariant, text: string): void {
    if (variant === 'success') {
      consola.success(text);
    } else if (variant === 'error') {
      consola.error(text);
    } else if (variant === 'info') {
      consola.info(text);
    }
  }
}

interface User {
  name: string;
  age: number;
}

class UsersData {
  data: User[];

  constructor() {
    this.data = [];
  }

  public showAll(): void {
    Message.showColorized(MessageVariant.Info, 'Users data');
    if (this.data.length === 0) {
      console.log('No data...');
    } else {
      console.table(this.data);
    }
  }

  public add(user: User): void {
    if (user.name.length > 0 && user.age > 0 && user.age < 140) {
      this.data.push(user);
      Message.showColorized(
        MessageVariant.Success,
        'User has been successfully added!'
      );
    } else {
      Message.showColorized(MessageVariant.Error, 'Wrong data!');
    }
  }

  public remove(userName: string): void {
    const index = this.data.findIndex((user) => {
      return userName === user.name;
    });

    if (index === -1) {
      Message.showColorized(MessageVariant.Error, 'User not found...');
    } else {
      this.data.splice(index, 1);
      Message.showColorized(MessageVariant.Success, 'User deleted!');
    }
  }
}
