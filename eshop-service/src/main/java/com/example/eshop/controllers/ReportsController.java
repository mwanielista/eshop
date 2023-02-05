package com.example.eshop.controllers;

import com.example.eshop.DTO.ReportDTO;
import com.example.eshop.models.Report;
import com.example.eshop.repository.ReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/reports")
public class ReportsController {


    @Autowired
    private ReportRepository reportRepository;

    @PostMapping("/add")
    @PreAuthorize("hasRole('ROLE_USER')")
    public void createReport(@RequestBody ReportDTO reportDTO){
        Report report = new Report();
        report.setTopic(reportDTO.getTopic());
        report.setMessage(reportDTO.getMessage());
        report.setReviewed(false);

        reportRepository.save(report);
    }

    @PostMapping("/change/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public void changeReportState(@PathVariable Integer id){
        Report report = reportRepository.findById(id).get();
        report.setReviewed(true);

        reportRepository.save(report);
    }

    @GetMapping("/get/all")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public List<Report> getAllReports(){
        return reportRepository.findAll();
    }

    @GetMapping("/get/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public Report getReport(@PathVariable Integer id){
        return reportRepository.findById(id).get();
    }

}
