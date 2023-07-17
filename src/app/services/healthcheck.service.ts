import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HealthcheckService {

  private prometheusUrl = 'http://localhost:8080/api/app/healthcheck/prometheus_health';
  private grafanaUrl = 'http://localhost:8080/api/app/healthcheck/grafana_health';
  private alertmanagerUrl = 'http://localhost:8080/api/app/healthcheck/alertmanager_health';
  private restartPrometheusUrl = 'http://localhost:8080/api/app/healthcheck/restart_prometheus';
  private restartAlertManagerUrl = 'http://localhost:8080/api/app/healthcheck/restart_alertmanager';
  private restartAlertManagerContainerUrl = 'http://localhost:8080/api/app/healthcheck/restart_alertmanager_container';
  private restartPrometheuscontaineUrl = 'http://localhost:8080/api/app/healthcheck/restart_prometheus_container';

  constructor(private http: HttpClient) {}

  public checkPrometheusHealth(): Observable<boolean> {
    console.log('OK');
    return this.http.get<boolean>(this.prometheusUrl);
  }

  public checkGrafanaHealth(): Observable<boolean> {
    console.log('OK');
    return this.http.get<boolean>(this.grafanaUrl);
  }

  public checkAlertmanagerHealth(): Observable<boolean> {
    console.log('OK');
    return this.http.get<boolean>(this.alertmanagerUrl);
  }

  public restartPrometheus(): Observable<boolean> {
    return this.http.get<boolean>(this.restartPrometheusUrl);
  }

  public restartAlertManager(): Observable<boolean> {
    return this.http.get<boolean>(this.restartAlertManagerUrl);
  }

  public restartAlertManagerContainer(): Observable<boolean> {
    return this.http.get<boolean>(this.restartAlertManagerContainerUrl);
  }

  
  public restartPrometheusContainer(): Observable<boolean> {
    return this.http.get<boolean>(this.restartPrometheuscontaineUrl);
  }
}
