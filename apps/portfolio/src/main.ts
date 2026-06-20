import { importProvidersFrom } from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";
import { provideAnimations } from "@angular/platform-browser/animations";
import {
  Award,
  BadgeCheck,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  Download,
  ExternalLink,
  FileText,
  Github,
  GraduationCap,
  Linkedin,
  LucideAngularModule,
  Mail,
  MapPin,
  Phone,
  ServerCog,
  X
} from "lucide-angular";
import { AppComponent } from "./app/app.component";

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    importProvidersFrom(
      LucideAngularModule.pick({
        Award,
        BadgeCheck,
        BriefcaseBusiness,
        CalendarDays,
        CheckCircle2,
        Download,
        ExternalLink,
        FileText,
        Github,
        GraduationCap,
        Linkedin,
        Mail,
        MapPin,
        Phone,
        ServerCog,
        X
      })
    )
  ]
}).catch((error) => console.error(error));
