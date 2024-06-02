import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EventGraph } from 'src/app/core/models/EventGraph';
import { Graph } from 'src/app/core/models/Graph';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  //la partie de graphique
  showLegend: boolean = true;
  showLabels: boolean = true;
  explodeSlices: boolean = false;
  doughnut: boolean = false;

  olympicList: Olympic[] = [];
  olympicFormatData: Graph[] = [];
  numberOfJO: number = 0;
  subscription!: Subscription;

  constructor(private olympicService: OlympicService, private router: Router) {}

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.subscription = this.olympicService.getOlympics().subscribe((res) => {
      this.olympicList = res;
      this.olympicFormatData = this.calculateMedalCountByCountry(
        this.olympicList
      );
      this.numberOfJO = this.calculateNumberOfJO();
    });
  }

  /**
   * Calculates the total number of medals by country from an array of Olympic data.
   *
   * @param data - An array of Olympic objects containing participation details for each country.
   * @returns An array of Graph objects where each object contains the country name and the corresponding total medals count.
   */
  calculateMedalCountByCountry(data: Olympic[]): Graph[] {
    return data.map((country) => {
      const totalMedals = country.participations.reduce(
        (total: number, participation: { medalsCount: number }) =>
          total + participation.medalsCount,
        0
      );
      return { name: country.country, value: totalMedals };
    });
  }

  /**
   * Calculates the number of unique Olympic Games years from the list of Olympic data.
   *
   * @returns The number of unique Olympic Games years.
   */
  calculateNumberOfJO(): number {
    const uniqueYears = new Set<number>();
    if (this.olympicList) {
      this.olympicList.forEach((country) => {
        country.participations.forEach((participation) => {
          uniqueYears.add(participation.year);
        });
      });
    }
    return uniqueYears.size;
  }

  /**
   * Handles the selection of a graph event, navigating to the corresponding country's detail page.
   *
   * @param event - The event containing details about the selected graph element.
   * @returns void
   */
  onSelect(event: EventGraph): void {
    const selectedCountry: Olympic | undefined = this.olympicList.find(
      (olympic) => olympic.country === event.name
    );
    this.router.navigate(['/country/', selectedCountry?.id]);
  }
}
