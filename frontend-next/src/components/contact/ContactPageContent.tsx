"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Mail, Phone, Linkedin, Instagram, CheckCircle2, Calendar } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { InlineWidget } from "react-calendly";
import { toast } from "sonner";
import confetti from "canvas-confetti";

const ContactPageContent = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        company: "",
        service: "",
        budget: "",
        urgency: "",
        message: "",
        acceptContact: false,
        newsletter: false
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.acceptContact) {
            toast.error("Erro", {
                description: "Você precisa aceitar receber contato para continuar.",
            });
            return;
        }

        // Simulação de envio com loading
        setIsSubmitting(true);

        try {
            // Simula requisição à API (2 segundos)
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Trigger Confetti
            const end = Date.now() + 3 * 1000; // 3 seconds
            const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];

            const frame = () => {
                if (Date.now() > end) return;

                confetti({
                    particleCount: 2,
                    angle: 60,
                    spread: 55,
                    startVelocity: 60,
                    origin: { x: 0, y: 0.5 },
                    colors: colors,
                });
                confetti({
                    particleCount: 2,
                    angle: 120,
                    spread: 55,
                    startVelocity: 60,
                    origin: { x: 1, y: 0.5 },
                    colors: colors,
                });

                requestAnimationFrame(frame);
            };

            frame();

            toast.success("Mensagem enviada!", {
                description: "Entraremos em contato em até 24 horas úteis.",
            });

            // Reset do formulário após envio bem-sucedido
            setFormData({
                name: "",
                email: "",
                phone: "",
                company: "",
                service: "",
                budget: "",
                urgency: "",
                message: "",
                acceptContact: false,
                newsletter: false
            });

            console.log("Form submitted:", formData);
        } catch {
            toast.error("Erro ao enviar", {
                description: "Tente novamente ou entre em contato por telefone.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main>
            {/* Hero */}
            <section className="pt-32 pb-12 px-4 bg-gradient-to-br from-primary-dark to-accent-blue text-primary-foreground">
                <div className="container mx-auto text-center">
                    <h1 className="text-4xl md:text-6xl font-bold font-heading mb-4">Vamos Conversar?</h1>
                    <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
                        Agende 30 minutos de diagnóstico gratuito e estratégico. Sem compromisso, sem custo.
                    </p>
                </div>
            </section>

            {/* Formulário e Informações */}
            <section className="py-16 px-4">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Coluna Formulário */}
                        <div className="lg:col-span-2">
                            <Card className="p-8">
                                <h2 className="text-2xl font-bold font-heading text-foreground mb-6">Agendar Diagnóstico Gratuito</h2>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <Label htmlFor="name">Nome completo *</Label>
                                            <Input
                                                id="name"
                                                required
                                                aria-required="true"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                placeholder="Seu nome"
                                            />
                                        </div>

                                        <div>
                                            <Label htmlFor="email">Email corporativo *</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                required
                                                aria-required="true"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                placeholder="seu@email.com"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <Label htmlFor="phone">Telefone/WhatsApp *</Label>
                                            <Input
                                                id="phone"
                                                type="tel"
                                                required
                                                aria-required="true"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                placeholder="(11) 99999-9999"
                                            />
                                        </div>

                                        <div>
                                            <Label htmlFor="company">Nome da empresa</Label>
                                            <Input
                                                id="company"
                                                value={formData.company}
                                                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                                placeholder="Sua Empresa Ltda"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <Label htmlFor="service">Qual serviço te interessa? *</Label>
                                        <Select value={formData.service} onValueChange={(value) => setFormData({ ...formData, service: value })}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecione um serviço" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="branding">Branding & Identidade Visual</SelectItem>
                                                <SelectItem value="site">Site Institucional</SelectItem>
                                                <SelectItem value="landing">Landing Page</SelectItem>
                                                <SelectItem value="video">Vídeo Institucional</SelectItem>
                                                <SelectItem value="rebranding">Rebranding Completo</SelectItem>
                                                <SelectItem value="design">Design Gráfico</SelectItem>
                                                <SelectItem value="nao-sei">Ainda não sei, quero conversar</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <Label htmlFor="budget">Orçamento estimado?</Label>
                                            <Select value={formData.budget} onValueChange={(value) => setFormData({ ...formData, budget: value })}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecione uma faixa" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="5k">Até R$ 5.000</SelectItem>
                                                    <SelectItem value="5-10k">R$ 5.000 - R$ 10.000</SelectItem>
                                                    <SelectItem value="10-20k">R$ 10.000 - R$ 20.000</SelectItem>
                                                    <SelectItem value="20k+">Acima de R$ 20.000</SelectItem>
                                                    <SelectItem value="nao-sei">Não sei ainda</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div>
                                            <Label htmlFor="urgency">Urgência?</Label>
                                            <Select value={formData.urgency} onValueChange={(value) => setFormData({ ...formData, urgency: value })}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Qual o seu timing?" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="urgente">Preciso para ontem!</SelectItem>
                                                    <SelectItem value="pressa">Tenho pressa (até 30 dias)</SelectItem>
                                                    <SelectItem value="tempo">Tenho tempo (30-60 dias)</SelectItem>
                                                    <SelectItem value="planejando">Estou planejando (60+ dias)</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    <div>
                                        <Label htmlFor="message">Conte-nos um pouco sobre seu desafio</Label>
                                        <Textarea
                                            id="message"
                                            rows={5}
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            placeholder="Descreva brevemente o que você precisa..."
                                        />
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex items-start gap-2">
                                            <Checkbox
                                                id="acceptContact"
                                                checked={formData.acceptContact}
                                                onCheckedChange={(checked) => setFormData({ ...formData, acceptContact: checked as boolean })}
                                                aria-required="true"
                                            />
                                            <label htmlFor="acceptContact" className="text-sm text-muted-foreground cursor-pointer">
                                                Aceito receber contato da Andorinha Marketing *
                                            </label>
                                        </div>

                                        <div className="flex items-start gap-2">
                                            <Checkbox
                                                id="newsletter"
                                                checked={formData.newsletter}
                                                onCheckedChange={(checked) => setFormData({ ...formData, newsletter: checked as boolean })}
                                            />
                                            <label htmlFor="newsletter" className="text-sm text-muted-foreground cursor-pointer">
                                                Quero receber conteúdo de marketing por email
                                            </label>
                                        </div>
                                    </div>

                                    <Button
                                        type="submit"
                                        size="lg"
                                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting && <Spinner size="sm" className="mr-2" />}
                                        {isSubmitting ? "Enviando..." : "Agendar Diagnóstico Gratuito"}
                                    </Button>

                                    <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                                        <div className="flex items-center gap-1">
                                            <CheckCircle2 className="w-4 h-4 text-primary" />
                                            <span>Resposta em 24h</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <CheckCircle2 className="w-4 h-4 text-primary" />
                                            <span>Sem compromisso</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <CheckCircle2 className="w-4 h-4 text-primary" />
                                            <span>Sem custo</span>
                                        </div>
                                    </div>
                                </form>
                            </Card>

                            {/* Calendly - Abaixo do formulário */}
                            <Card className="p-8 mt-8 bg-accent-blue-light/10 border-accent-blue-light">
                                <div className="flex items-center gap-2 mb-3">
                                    <Calendar className="w-5 h-5 text-primary" />
                                    <h3 className="font-semibold text-xl text-foreground">Ou Agende Direto</h3>
                                </div>
                                <p className="text-sm text-muted-foreground mb-6">
                                    Prefere escolher o horário você mesmo? Use nosso calendário abaixo:
                                </p>
                                <div className="rounded-lg overflow-hidden border border-border bg-white">
                                    <InlineWidget
                                        url="https://calendly.com/roilabs-andorinha/30min"
                                        styles={{
                                            height: '600px',
                                            minWidth: '100%'
                                        }}
                                        pageSettings={{
                                            backgroundColor: 'ffffff',
                                            primaryColor: 'FF6B35',
                                            textColor: '1A1A1A'
                                        }}
                                    />
                                </div>
                            </Card>
                        </div>

                        {/* Coluna Informações */}
                        <div className="space-y-6">
                            <Card className="p-6">
                                <h3 className="font-semibold text-lg text-foreground mb-4">Contato</h3>
                                <div className="space-y-4">
                                    <a
                                        href="mailto:contato@andorinha.roilabs.com.br"
                                        className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                            <Mail className="w-5 h-5 text-primary" />
                                        </div>
                                        <span className="text-sm">contato@andorinha.com.br</span>
                                    </a>

                                    <a
                                        href="tel:+5511999999999"
                                        className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                            <Phone className="w-5 h-5 text-primary" />
                                        </div>
                                        <span className="text-sm">(11) 99999-9999</span>
                                    </a>
                                </div>
                            </Card>

                            <Card className="p-6">
                                <h3 className="font-semibold text-lg text-foreground mb-4">Horário de Atendimento</h3>
                                <div className="space-y-2 text-sm text-muted-foreground">
                                    <p>Segunda a Sexta: 9h às 18h</p>
                                    <p>Sábado: 9h às 13h (WhatsApp)</p>
                                    <p>Domingo: Fechado</p>
                                </div>
                            </Card>

                            <Card className="p-6">
                                <h3 className="font-semibold text-lg text-foreground mb-4">Redes Sociais</h3>
                                <div className="flex gap-3">
                                    <a
                                        href="https://linkedin.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-12 h-12 rounded-full bg-primary/10 hover:bg-primary flex items-center justify-center transition-colors group"
                                        aria-label="LinkedIn"
                                    >
                                        <Linkedin className="w-6 h-6 text-primary group-hover:text-primary-foreground" aria-hidden="true" />
                                    </a>
                                    <a
                                        href="https://instagram.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-12 h-12 rounded-full bg-primary/10 hover:bg-primary flex items-center justify-center transition-colors group"
                                        aria-label="Instagram"
                                    >
                                        <Instagram className="w-6 h-6 text-primary group-hover:text-primary-foreground" aria-hidden="true" />
                                    </a>
                                </div>
                            </Card>

                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default ContactPageContent;
