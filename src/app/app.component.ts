import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./shared/navbar/navbar.component";
import { FooterComponent } from "./shared/footer/footer.component";
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'chat-application';

  meta = inject(Meta);

  constructor() {
    this.meta.addTag({ name: 'viewport', content: 'width=device-width, initial-scale=1' });
    this.meta.addTag({ name: 'author', content: 'Manthan Ankolekar' });
    this.meta.addTag({ name: 'keywords', content: 'angular, nodejs, express, mongodb' });
    this.meta.addTag({ name: 'robots', content: 'index, follow' });
    this.meta.addTag({ property: 'og:title', content: 'Chat Application' });
    this.meta.addTag({ property: 'og:description', content: 'A simple chat application built using Angular, Node.js, Express, and MongoDB.' });
    this.meta.addTag({ property: 'og:image', content: 'https://chat-application-manthanank.vercel.app/image.jpg' });
    this.meta.addTag({ property: 'og:url', content: 'https://chat-application-manthanank.vercel.app/' });
    this.meta.addTag({ rel: 'canonical', href: 'https://chat-application-manthanank.vercel.app/' });
  }
}
