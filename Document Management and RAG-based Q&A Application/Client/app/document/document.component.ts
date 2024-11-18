import { Component, OnInit } from '@angular/core';
import { DocumentService } from './document.service';

@Component({
    selector: 'app-document',
    templateUrl: './document.component.html',
})
export class DocumentComponent implements OnInit {
    documents = [];
    title = '';
    content = '';

    constructor(private documentService: DocumentService) {}

    ngOnInit() {
        this.loadDocuments();
    }

    loadDocuments() {
        this.documentService.getDocuments().subscribe((docs: any) => (this.documents = docs));
    }

    uploadDocument() {
        this.documentService
            .uploadDocument({ title: this.title, content: this.content })
            .subscribe(() => this.loadDocuments());
    }

    deleteDocument(id: number) {
        this.documentService.deleteDocument(id).subscribe(() => this.loadDocuments());
    }
}

