export interface IChoice {
    choiceId: number;
    choiceContent: string;
  }
  
  export interface IQuestion {
    questionId: number;
    questioncontent: string;
    choices: IChoice[];
  }
  