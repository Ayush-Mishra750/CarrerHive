import { Briefcase } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg  flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-lg font-bold text-blue-600">
                CarrerHive
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Connecting talent with opportunity, one match at a time.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-foreground">For Job Seekers</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Browse Jobs</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Career Resources</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Resume Builder</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Job Alerts</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-foreground">For Employers</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Post a Job</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Browse Candidates</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Success Stories</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-foreground">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; 2025 CarrerHive. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
