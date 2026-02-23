import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, Building2, Trophy, GraduationCap } from "lucide-react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pt-14 animated-gradient-bg">
      <div className="glass text-primary-foreground py-6 text-center shadow-md">
        <h1 className="text-2xl font-bold">About College</h1>
      </div>
      <div className="max-w-3xl mx-auto p-6 md:p-10 space-y-6">
        <Card className="shadow-2xl glass-card">
          <CardContent className="p-6 space-y-6">
            <section>
              <div className="flex items-center gap-2 mb-3">
                <GraduationCap className="w-6 h-6 text-primary" />
                <h2 className="text-xl font-bold text-primary">Welcome to Vignan's Lara Institute of Technology and Sciences</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Our college, located in Guntur, Andhra Pradesh, is committed to providing quality education in engineering and technology. We focus on academic excellence, innovation, and holistic development of our students.
              </p>
            </section>

            <section>
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-bold text-primary">Vision & Mission</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                We aim to cultivate a learning environment where students can grow intellectually and professionally, becoming responsible and skilled individuals.
              </p>
            </section>

            <section>
              <div className="flex items-center gap-2 mb-3">
                <Building2 className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-bold text-primary">Campus Facilities</h2>
              </div>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Modern laboratories and research centers</li>
                <li>Well-stocked library with digital resources</li>
                <li>Sports and recreational facilities</li>
                <li>Hostel and campus accommodation</li>
                <li>Clubs, events, and extracurricular activities</li>
              </ul>
            </section>

            <section>
              <div className="flex items-center gap-2 mb-3">
                <GraduationCap className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-bold text-primary">Courses Offered</h2>
              </div>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Computer Science & Engineering (CSE)</li>
                <li>Electronics & Communication Engineering (ECE)</li>
                <li>Mechanical Engineering (ME)</li>
                <li>Civil Engineering (CE)</li>
                <li>Other professional programs</li>
              </ul>
            </section>

            <section>
              <div className="flex items-center gap-2 mb-3">
                <Trophy className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-bold text-primary">Placement & Internships</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                We provide students with excellent placement support and internship opportunities in reputed companies to ensure career growth and industry exposure.
              </p>
            </section>

            <Button variant="outline" onClick={() => navigate(-1)} className="mt-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>);

};

export default About;