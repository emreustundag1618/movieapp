import { Injectable } from "@angular/core";
import { Category } from "../models/category";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable()

export class CategoryService {

    readonly url = "http://localhost:3000/categories";

    constructor(private http: HttpClient) {}

    getCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(this.url);
    }
}