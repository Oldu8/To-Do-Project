let arrPriority = ['Major','Middle','Low'];
let arrStatus = ['Complete', 'In progress', 'Break', 'Postponed'];

function Task(article, status, priority, ddl){
    this.article = article;
    this.status = status;
    this.priority = priority;
    this.ddl = ddl;
}