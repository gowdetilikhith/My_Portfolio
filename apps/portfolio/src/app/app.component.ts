import { CommonModule } from "@angular/common";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { Component, CUSTOM_ELEMENTS_SCHEMA, HostListener, inject, AfterViewInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import {
  Award,
  BadgeCheck,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  Download,
  ExternalLink,
  FileText,
  GraduationCap,
  Github,
  Linkedin,
  LucideAngularModule,
  Mail,
  MapPin,
  Phone,
  ServerCog,
  X
} from "lucide-angular";
import { profile } from "./data/profile";

@Component({
  selector: "lk-root",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    LucideAngularModule
  ],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent implements AfterViewInit {
  private readonly http = inject(HttpClient);
  readonly profile = profile;
  readonly Award = Award;
  readonly BadgeCheck = BadgeCheck;
  readonly BriefcaseBusiness = BriefcaseBusiness;
  readonly CalendarDays = CalendarDays;
  readonly CheckCircle2 = CheckCircle2;
  readonly Download = Download;
  readonly ExternalLink = ExternalLink;
  readonly FileText = FileText;
  readonly GraduationCap = GraduationCap;
  readonly MapPin = MapPin;
  readonly ServerCog = ServerCog;
  readonly icons = { Mail, Phone, Linkedin, Github, X };
  
  isContactOpen = false;
  isResumeOpen = false;
  submitState: "idle" | "sending" | "sent" | "error" = "idle";
  form = {
    name: "",
    email: "",
    message: ""
  };

  get filteredTechStack() {
    return this.profile.techStack;
  }

  ngAfterViewInit(): void {
    this.initScrollReveal();
  }

  private initScrollReveal(): void {
    if (typeof window !== "undefined" && "IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("revealed");
              // Once revealed, no need to track it anymore
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.05,
          rootMargin: "0px 0px -20px 0px"
        }
      );

      const targets = document.querySelectorAll(".section-container, .hero, .recognition-section");
      targets.forEach((target) => observer.observe(target));
    }
  }

  @HostListener("document:keydown.escape")
  closeOnEscape(): void {
    this.isContactOpen = false;
    this.isResumeOpen = false;
  }

  openContact(): void {
    this.isContactOpen = true;
    this.isResumeOpen = false;
    this.submitState = "idle";
  }

  openResume(): void {
    this.isResumeOpen = true;
    this.isContactOpen = false;
  }

  submitContact(): void {
    if (!this.form.name || !this.form.email || !this.form.message) {
      this.submitState = "error";
      return;
    }

    this.submitState = "sending";
    this.http.post("http://localhost:3001/contact", this.form).subscribe({
      next: () => {
        this.submitState = "sent";
        this.openMailClient();
      },
      error: () => {
        this.submitState = "sent";
        this.openMailClient();
      }
    });
  }

  openMailClient(): void {
    const subject = encodeURIComponent(`Portfolio inquiry from ${this.form.name}`);
    const body = encodeURIComponent(`${this.form.message}\n\nFrom: ${this.form.name}\nEmail: ${this.form.email}`);
    window.location.href = `mailto:${this.profile.email}?subject=${subject}&body=${body}`;
  }
}
