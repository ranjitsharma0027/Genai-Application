import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-qna',
    templateUrl: './qna.component.html',
})
export class QnaComponent {
    question = '';
    answers = [];

    constructor(private http: HttpClient) {}

    askQuestion() {
        this.http
            .post('/api/qna', { question: this.question })
            .subscribe((res: any) => (this.answers = res.answers));
    }
}
