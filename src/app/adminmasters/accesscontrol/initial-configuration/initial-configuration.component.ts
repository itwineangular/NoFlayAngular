import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-initial-configuration',
  templateUrl: './initial-configuration.component.html',
  styleUrls: ['./initial-configuration.component.css']
})
export class InitialConfigurationComponent implements OnInit {

  smtpPage: any;
  cronSettingsPage: any;

  constructor() { }

  ngOnInit() {
    this.smtpPage = document.getElementById('smtpPage');
    this.cronSettingsPage = document.getElementById('cronSettingsPage');
    this.hideCronPage();
  }

  hideCronPage(): void {
    this.smtpPage.style.display = 'block';
    this.cronSettingsPage.style.display = 'none';
  }

  hideSmtpPage(): void {
    this.smtpPage.style.display = 'none';
    this.cronSettingsPage.style.display = 'block';
  }

  ChangePage(key): void {
    switch (key) {
      case "smtp":
        this.hideCronPage();
        break;
      case "corn":
        this.hideSmtpPage();
        break;

      default:
        break;
    }

  }

}
