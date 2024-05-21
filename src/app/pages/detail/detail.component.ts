import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Graph } from 'src/app/core/models/Graph';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit, OnDestroy {
  // options
  showXAxis = true;
  showYAxis = true;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = 'Years';
  showYAxisLabel = true;
  yAxisLabel = 'Medals';

  olympic!: Olympic;
  numberOfMedal!: number;
  numberOfAthlete!: number;
  olympicFormatData: Graph[] = [];

  subscription!: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private olympicService: OlympicService
  ) {}

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    const id: string | null = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.subscription = this.olympicService
        .getOlympicByCountryById(+id)
        .subscribe((res) => {
          this.olympic = res;
          this.numberOfMedal = this.calculateTotalOfMedal(this.olympic);
          this.numberOfAthlete = this.calculateTotalOfAthlete(this.olympic);
          this.olympicFormatData = this.calculateMedalsCountByYears();
        });
    }
  }

  /**
   * Calculates the total number of medals from all participations in the given Olympic object.
   *
   * @param olympic - The Olympic object containing participation details.
   * @returns The total number of medals.
   */
  calculateTotalOfMedal(olympic: Olympic): number {
    return olympic.participations.reduce(
      (total: number, participation: { medalsCount: number }) =>
        total + participation.medalsCount,
      0
    );
  }

  /**
   * Calculates the total number of athletes from all participations in the given Olympic object.
   *
   * @param olympic - The Olympic object containing participation details.
   * @returns The total number of athletes.
   */
  calculateTotalOfAthlete(olympic: Olympic): number {
    return olympic.participations.reduce(
      (total: number, participation: { athleteCount: number }) =>
        total + participation.athleteCount,
      0
    );
  }

  /**
   * Creates an array of Graph objects representing the medals count by year from the participations.
   *
   * @returns An array of Graph objects where each object contains the year and the corresponding medals count.
   */
  calculateMedalsCountByYears(): Graph[] {
    return this.olympic?.participations.map((participation) => ({
      name: participation.year.toString(),
      value: participation.medalsCount,
    }));
  }

  /**
   * Navigates back to the root route.
   *
   * @returns void
   */
  goBack(): void {
    this.router.navigate(['/']);
  }
}
