import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];
  isLoading = false;

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
    .subscribe(heroes => {
      this.heroes = heroes;
      this.isLoading = false;
    });
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  delete(hero: Hero): void {
    this.isLoading = true;
    this.heroService.deleteHero(hero).subscribe(_ => {
      this.getHeroes();
    });
  }
}
